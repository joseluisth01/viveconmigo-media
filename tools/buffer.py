"""Publica en Buffer (API GraphQL) usando la clave del secreto BUFFER_API_KEY.
Uso (lo lanza la acción de GitHub "buffer-post"):
  python tools/buffer.py channels
  python tools/buffer.py post --service instagram --text "..." --due "2026-11-12T17:00:00Z" --video URL [--thumb-ms 15950]
  python tools/buffer.py delete --id POST_ID
Solo publica en canales cuyo nombre contenga "viveconmigo" (para no tocar nunca los de BreathForce)."""
import argparse, json, os, sys, urllib.request

API = "https://api.buffer.com"
GUARD = "viveconmigo"

def gql(query):
    key = os.environ.get("BUFFER_API_KEY")
    if not key:
        sys.exit("Falta el secreto BUFFER_API_KEY")
    req = urllib.request.Request(API, data=json.dumps({"query": query}).encode(),
                                 headers={"Content-Type": "application/json", "Authorization": "Bearer " + key})
    with urllib.request.urlopen(req, timeout=60) as r:
        d = json.load(r)
    if d.get("errors"):
        sys.exit("Error GraphQL: " + json.dumps(d["errors"], ensure_ascii=False))
    return d["data"]

def channels():
    orgs = gql("query { account { organizations { id name } } }")["account"]["organizations"]
    out = []
    for o in orgs:
        for c in gql('query { channels(input: { organizationId: %s }) { id name service displayName } }' % json.dumps(o["id"]))["channels"]:
            out.append({**c, "organization": o["name"]})
    return out

def pick(service):
    cands = [c for c in channels() if c["service"].lower() == service and GUARD in (c["name"] + " " + (c.get("displayName") or "")).lower()]
    if len(cands) != 1:
        sys.exit(f"Esperaba 1 canal {service} de viveconmigo y hay {len(cands)}: {cands}")
    return cands[0]

def summary(obj):
    txt = json.dumps(obj, ensure_ascii=False, indent=1)
    print("RESULT_JSON=" + json.dumps(obj, ensure_ascii=False))
    p = os.environ.get("GITHUB_STEP_SUMMARY")
    if p:
        open(p, "a").write("```json\n" + txt + "\n```\n")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["channels", "post", "delete"])
    ap.add_argument("--service", default="instagram")
    ap.add_argument("--text", default="")
    ap.add_argument("--due")
    ap.add_argument("--video")
    ap.add_argument("--thumb-ms", type=int)
    ap.add_argument("--id")
    a = ap.parse_args()
    if a.cmd == "channels":
        summary({"channels": channels()}); return
    if a.cmd == "delete":
        d = gql('mutation { deletePost(input: { id: %s }) { __typename ... on DeletePostSuccess { id } ... on MutationError { message } } }' % json.dumps(a.id))
        summary(d["deletePost"]); return
    if not (a.due and a.due.endswith("Z") and a.video and a.video.startswith("https://")):
        sys.exit("post necesita --due en UTC terminado en Z y --video https://")
    ch = pick(a.service)
    vmeta = ("metadata: { thumbnailOffset: %d }" % a.thumb_ms) if a.thumb_ms is not None else ""
    meta = "metadata: { instagram: { type: reel, shouldShareToFeed: false } }," if a.service == "instagram" else ""
    q = """mutation { createPost(input: {
      text: %s, channelId: %s, schedulingType: automatic, mode: customScheduled, dueAt: %s,
      %s assets: [{ video: { url: %s %s } }] }) {
        __typename ... on PostActionSuccess { post { id dueAt } } ... on MutationError { message } } }""" % (
        json.dumps(a.text), json.dumps(ch["id"]), json.dumps(a.due), meta, json.dumps(a.video), vmeta)
    res = gql(q)["createPost"]
    summary({"channel": ch["name"], "service": ch["service"], **res})
    if res.get("__typename") != "PostActionSuccess":
        sys.exit(1)

if __name__ == "__main__":
    main()
