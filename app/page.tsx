import { Button } from '@/components/ui/Button'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Test</Button>
      <div className='h-[4000px] w-full'/>
    </main>
  )
}
