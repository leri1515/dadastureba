import {useEffect,useState} from 'react'
import type {Doctor} from '../types'
export function useFetchDoctors(){
 const [doctors,setDoctors]=useState<Doctor[]>([])
 const [loading,setLoading]=useState(true)
 const [error,setError]=useState('')
 useEffect(()=>{const controller=new AbortController();async function load(){try{const res=await fetch('/doctors.json',{signal:controller.signal});if(!res.ok)throw Error('მონაცემები ვერ ჩაიტვირთა');const data:Doctor[]=await res.json();setDoctors(data)}catch(err){if(!controller.signal.aborted)setError(err instanceof Error?err.message:'შეცდომა')}finally{if(!controller.signal.aborted)setLoading(false)}}void load();return()=>controller.abort()},[])
 return {doctors,loading,error}
}
