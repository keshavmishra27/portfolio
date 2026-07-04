import urllib.request, json

headers={'User-Agent':'Portfolio-App'}
repos_url = 'https://api.github.com/users/keshavmishra27/repos?per_page=100'
repos = json.loads(urllib.request.urlopen(urllib.request.Request(repos_url, headers=headers)).read().decode())

for r in repos:
    if not r['fork']:
        name = r['name']
        for branch in ['main', 'master']:
            try:
                url = f'https://raw.githubusercontent.com/keshavmishra27/{name}/{branch}/README.md'
                readme = urllib.request.urlopen(urllib.request.Request(url, headers=headers)).read().decode()
                if '.github.io' in readme or 'vercel.app' in readme or 'netlify.app' in readme:
                    print(f"[{name}] -> Found potential demo link in README:")
                    for line in readme.split('\n'):
                        if 'github.io' in line or 'vercel.app' in line or 'netlify.app' in line:
                            print("  " + line.strip())
            except Exception as e:
                pass
