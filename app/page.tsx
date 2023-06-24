import styles from "./page.module.scss"

export default function Home() {
  return (
    <div className='w-full h-[100vh] relative overflow-hidden'>
      {/* container */}
        <div className={styles.container}>
          <div className={styles.HDashedLine} style={{ top: "-93px" }} />
          <div className={styles.HDashedLine} style={{ bottom: "-92px" }} />
          <div
            className={styles.VDashedLine}
            style={{ right: "calc(50% - 88px)" }}
          />
          <div
            className={styles.VDashedLine}
            style={{ left: "calc(-50% - 187px)" }}
          />
        <h1 className='text-[2.5rem] translate-y-5 animate-slide-in-sec font-bold
        absolute top-1/2 min-w-[165px] opacity-0 pr-2
        transform -translate-x-1/2 translate-[calc(-50%-20px)] py-8 before:content
        before:absolute before:top-0 before:-left-[50px] before:w-full
        before:h-full before:border-white before:border-[1px] before:rounded'>
          Kurosawa&#39;s <br />Portfolio
        </h1>
      </div>
    </div>
  )
}
