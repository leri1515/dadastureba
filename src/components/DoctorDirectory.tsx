import {useMemo,useState} from 'react'
import {Search,SlidersHorizontal,UserRoundSearch} from 'lucide-react'
import {useFetchDoctors} from '../hooks/useFetchDoctors'
import DoctorCard from './DoctorCard'
import type {Doctor} from '../types'
export default function DoctorDirectory({onBook,compact=false}:{onBook:(doctor:Doctor)=>void;compact?:boolean}){
 const {doctors,loading,error}=useFetchDoctors();const [query,setQuery]=useState('');const [specialty,setSpecialty]=useState('ყველა სპეციალობა')
 const specialties=useMemo(()=>['ყველა სპეციალობა',...new Set(doctors.map(d=>d.specialty))],[doctors])
 const filtered=useMemo(()=>doctors.filter(d=>(specialty==='ყველა სპეციალობა'||d.specialty===specialty)&&`${d.name} ${d.specialty}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0,compact?3:undefined),[doctors,specialty,query,compact])
 return <section><div className="section-heading"><div><p className="eyebrow">სამედიცინო გუნდი</p><h2 className="heading">{compact?'ჩვენი სპეციალისტები':'იპოვეთ სასურველი ექიმი'}</h2><p className="subheading">აირჩიეთ სპეციალისტი და დაჯავშნეთ თქვენთვის მოსახერხებელი დრო.</p></div><div className="hidden sm:flex icon-circle"><UserRoundSearch size={22}/></div></div>
 {!compact&&<div className="surface p-4 flex flex-col md:flex-row gap-3 mb-6"><label className="search-box flex-1"><Search size={18}/><input aria-label="ექიმის ძიება" placeholder="ექიმის სახელი ან სპეციალობა..." value={query} onChange={e=>setQuery(e.target.value)}/></label><label className="search-box md:w-64"><SlidersHorizontal size={17}/><select aria-label="სპეციალობის ფილტრი" value={specialty} onChange={e=>setSpecialty(e.target.value)}>{specialties.map(s=><option key={s}>{s}</option>)}</select></label></div>}
 {loading?<p role="status" className="muted-box">ექიმების სია იტვირთება...</p>:error?<p role="alert" className="muted-box">{error}</p>:filtered.length?<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{filtered.map(d=><DoctorCard key={d.id} doctor={d} onBook={onBook}/>)}</div>:<p className="muted-box">მითითებული ფილტრით ექიმი ვერ მოიძებნა.</p>}
 </section>
}
