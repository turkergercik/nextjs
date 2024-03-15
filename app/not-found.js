import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex absolute top-0 right-0 left-0 bottom-0 z-10 bg-blue-500 justify-center items-center flex-col'>
      <h2 className='text-3xl p-2'>Not Found</h2>
      
      <Link href="/">Return Home</Link>
    </div>
  )
}