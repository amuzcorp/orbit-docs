import { redirect } from 'next/navigation'
import { app, analytics } from '@/lib/firebase'


export default function Page() {
  redirect('/ko')
}
