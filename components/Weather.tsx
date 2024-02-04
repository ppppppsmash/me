import Rainy from '@/components/Rainy'
import Snowy from '@/components/Snowy'

export default function Weather() {
  const currentDate = new Date().getMinutes()
  const isOddDate = currentDate % 2 !== 0

  return (
    <div>
      {isOddDate ? <Snowy /> : <Rainy />}
    </div>
  )
}