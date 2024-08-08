import React from 'react'

interface StatCardProps {
type: "appointment" | "pending" | "cancelled"
count: number,
label:string,
icon:string
}

const StatCard = ({count = 0, label, icon, type}: StatCardProps) => {
  return (
    <div>StatCard</div>
  )
}

export default StatCard