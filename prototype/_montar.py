#!/usr/bin/env python3
"""Sustituye los marcadores {{ESPEC:nombre}} de la plantilla por el SVG del espécimen."""
import re, sys
esp = open('_especimenes.html').read()
S = {n: re.sub(r'\sdata-e="[a-z]+"', '', s) for s, n in
     zip(re.findall(r'(<svg class="espec".*?</svg>)', esp, re.S),
         re.findall(r'data-e="([a-z]+)"', esp))}
t = open('_plantilla.html').read()
faltan = set(re.findall(r'\{\{ESPEC:([a-z]+)\}\}', t)) - set(S)
if faltan:
    sys.exit(f"espécimen inexistente: {faltan}")
out = re.sub(r'\{\{ESPEC:([a-z]+)\}\}', lambda m: S[m.group(1)], t)
open('index.html','w').write(out)
print(f"index.html · {len(out)//1024} KB · {len(re.findall(r'class=.espec', out))} especímenes")
