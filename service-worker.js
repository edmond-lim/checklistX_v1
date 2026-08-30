{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Bump CACHE_NAME whenever you edit any page \'97 that's what forces phones to pick up changes.\
const CACHE_NAME = 'checklists-v11';\
\
const ASSETS = [\
  './',\
  './index.html',\
  './trade_entry_form.html',\
  './trade_entry_guide.html',\
  './trading-checklist.html',\
  './mms-checklist.html',\
  './gemspot-checklist.html',\
  './task-checklist.html',\
  './site-survey.html',\
  './manifest.json',\
  './icon192.png',\
  './icon512.png'\
];\
\
self.addEventListener('install', (event) => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME).then((cache) =>\
      // Cache each file on its own: one bad URL no longer fails the whole install.\
      Promise.allSettled(ASSETS.map((url) => cache.add(url)))\
    )\
  );\
  self.skipWaiting();\
\});\
\
self.addEventListener('activate', (event) => \{\
  event.waitUntil(\
    caches.keys().then((keys) =>\
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))\
    )\
  );\
  self.clients.claim();\
\});\
\
self.addEventListener('fetch', (event) => \{\
  if (event.request.method !== 'GET') return;\
\
  event.respondWith(\
    caches.match(event.request).then((cached) => \{\
      const fetchPromise = fetch(event.request)\
        .then((networkResponse) => \{\
          // Cache same-origin 200s, plus opaque font responses so type survives offline.\
          const cacheable =\
            networkResponse &&\
            (networkResponse.status === 200 || networkResponse.type === 'opaque');\
          if (cacheable) \{\
            const clone = networkResponse.clone();\
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));\
          \}\
          return networkResponse;\
        \})\
        .catch(() => cached);\
      return cached || fetchPromise;\
    \})\
  );\
\});}