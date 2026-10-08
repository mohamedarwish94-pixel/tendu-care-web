const C='tendu-f2fecc760c95';const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin)return;
 if(q.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){e.respondWith(fetch(q).then(r=>{if(r.ok){const c2=r.clone();caches.open(C).then(c=>c.put('index.html',c2));}return r;}).catch(()=>caches.match('index.html')));return;}
 e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{if(res.ok){const c2=res.clone();caches.open(C).then(c=>c.put(q,c2));}return res;})));});
