
// LoonSimulatieDemo.jsx – volledige versie
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem } from '@/components/ui/select';

export default function LoonSimulatieDemo() {
  const [form, setForm] = useState({
    taal:'NL',statuut:'Statutair',loonschaal:'A11',trap:0,datumIndienst:'',urenPerWeek:38,afwezigheden:0,
    haardtoelage:false,standplaatstoelage:false,functietoelage:false,premie4v5:false,premieHalftijds55:false,
    AIG:false,beleidsondersteuning:false,SAT_BiZa:false,SAT_Justitie:false,luchtsteun:false,bijkomendeToelage:0,compenserendeToelage:0,
    mandaat:'',mandaatType:'',toelageRekenplichtige:0,toelageSecretaris:0,toelageDirecteur:0,
    ictDevice:false,ictVoordeel:0,dienstwagen:false,brandstof:'',
    telefoonvergoeding:false,uniformvergoeding:false,SHAPE:false,onderzoekskosten:false,politiehond:false,hondenAantal:0,telewerk:'',
    gezinstoestand:'alleenstaand',partnerInkomen:'geen',mindervalide:false,partnerMindervalide:false,kinderen:0,kinderenMindervalide:0,andereTenLaste:0,andere66plus:0,andereMindervalide:0
  });
  const [result,setResult]=useState({bruto:0,netto:0});
  const handle=(k,v)=>setForm({...form,[k]:v});

  const S=(l,k,o)=><div key={k}><Label>{l}</Label><Select value={form[k]} onValueChange={v=>handle(k,v)}>{o.map(x=><SelectItem key={x} value={x}>{x||'—'}</SelectItem>)}</Select></div>;
  const C=(l,k)=><div key={k}><Label>{l}</Label><Checkbox checked={form[k]} onCheckedChange={v=>handle(k,v)} /></div>;
  const N=(l,k)=><div key={k}><Label>{l}</Label><Input type='number' value={form[k]} onChange={e=>handle(k,Number(e.target.value||0))}/></div>;
  const T=(l,k)=><div key={k}><Label>{l}</Label><Input value={form[k]} onChange={e=>handle(k,e.target.value)} /></div>;
  const D=(l,k)=><div key={k}><Label>{l}</Label><Input type='date' value={form[k]} onChange={e=>handle(k,e.target.value)} /></div>;

  const basis=[S('Taal','taal',['NL','FR']),S('Statuut','statuut',['Statutair','Contractueel','Jobstudent']),T('Loonschaal','loonschaal'),N('Trap','trap'),D('Datum indienst','datumIndienst'),N('Uren/week','urenPerWeek'),N('Afwezigheden','afwezigheden')];
  const toelagen=[C('Haardtoelage','haardtoelage'),C('Standplaats','standplaatstoelage'),C('Functietoelage','functietoelage'),C('Premie 4/5','premie4v5'),C('Premie 55+','premieHalftijds55'),C('AIG','AIG'),C('Beleidsondersteuning','beleidsondersteuning'),C('SAT BiZa','SAT_BiZa'),C('SAT Justitie','SAT_Justitie'),C('Luchtsteun','luchtsteun'),N('Bijk. toelage','bijkomendeToelage'),N('Comp. toelage','compenserendeToelage')];
  const mandaten=[T('Mandaat','mandaat'),T('Type','mandaatType'),N('Tol. Rekenplichtige','toelageRekenplichtige'),N('Tol. Secretaris','toelageSecretaris'),N('Tol. Directeur','toelageDirecteur')];
  const voordelen=[C('ICT-device privé','ictDevice'),N('VAA ICT','ictVoordeel'),C('Dienstwagen','dienstwagen'),S('Brandstof','brandstof',['','Benzine','Diesel','Elektrisch','Hybride'])];
  const vergoedingen=[C('Telefoonvergoeding','telefoonvergoeding'),C('Uniformvergoeding','uniformvergoeding'),C('SHAPE','SHAPE'),C('Onderzoekskosten','onderzoekskosten'),C('Politiehond','politiehond'),N('Honden','hondenAantal'),S('Telewerk','telewerk',['','structureel','occasioneel'])];
  const fiscaliteit=[S('Gezinstoestand','gezinstoestand',['alleenstaand','gehuwd','gescheiden','weduwe']),S('Inkomen partner','partnerInkomen',['geen','laag','gemiddeld','pensioenlaag','pensioenmiddel','pensioenhoger']),C('Mindervalide','mindervalide'),C('Partner mindervalide','partnerMindervalide'),N('Kinderen','kinderen'),N('Kinderen minderv.','kinderenMindervalide'),N('Andere ten laste','andereTenLaste'),N('66+ ten laste','andere66plus'),N('Andere minderv.','andereMindervalide')];

  const bruteBereken=()=>{const bruto=40000+form.trap*200;setResult({bruto,netto:bruto/14});};

  const Sec=({t,children})=><Card className='mb-6'><h2 className='text-lg font-semibold px-4 pt-4'>{t}</h2><CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>{children}</CardContent></Card>;

  return (<div className='p-6 max-w-6xl mx-auto'>
    <h1 className='text-2xl font-bold mb-6'>Loon- en Toelagensimulatie</h1>
    <Sec t='Basis'>{basis}</Sec>
    <Sec t='Toelagen & Premies'>{toelagen}</Sec>
    <Sec t='Mandaten'>{mandaten}</Sec>
    <Sec t='Voordelen in Natura'>{voordelen}</Sec>
    <Sec t='Vergoedingen'>{vergoedingen}</Sec>
    <Sec t='Fiscaliteit'>{fiscaliteit}</Sec>
    <Button onClick={bruteBereken} className='mb-6'>Bereken</Button>
    <Card><CardContent><h3 className='font-semibold mb-2'>Resultaat</h3><p>Bruto jaar: € {result.bruto.toFixed(2)}</p><p>Netto maand: € {result.netto.toFixed(2)}</p></CardContent></Card>
  </div>);
}
