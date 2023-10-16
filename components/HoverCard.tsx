'use client'

interface WORK_INFO {
  description: string
  skill: string
  infra: string
}

export default function HoverCard({
  description,
  skill,
  infra
}: WORK_INFO) {
  return (
    <div>
      <p>{ description }</p>
      <p>{ skill }</p>
      <p>{ infra }</p>
    </div>
  )
}