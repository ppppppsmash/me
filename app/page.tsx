import styles from "./page.module.scss"
import { PROFILE } from '@/constants'

export default function Home() {
  return (
    <div className='w-full h-[100vh] relative overflow-hidden'>
      {/* container */}
        <div className={styles.container}>
          <div className={styles.HDashedLine} style={{ top: "-93px" }} />
          <div className={styles.HDashedLine} style={{ bottom: "-92px" }} />
          <div
            className={styles.VDashedLine}
            style={{ right: "calc(50% - 160px)" }}
          />
          <div
            className={styles.VDashedLine}
            style={{ left: "calc(-50% - 136px)" }}
          />
        <h1 className='text-[2.5rem] translate-y-5 animate-slide-in-sec font-bold
        absolute top-1/2 left-[calc(50%+50px)] min-w-[165px] opacity-0
        transform -translate-x-1/2 translate-[calc(-50%-20px)] py-8 before:content
        before:absolute before:top-0 before:-left-[50px] before:w-[108%]
        before:h-full before:border-white before:border-[1px] before:rounded'>
          Kurosawa&#39;s <br />Portfolio
        </h1>
      </div>
    </div>
  )
}
