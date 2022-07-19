import React from 'react'
import Image from "next/image"

const PAP = require("../img/PAP.png")
const ZK = require("../img/ZK.png")
const PA = require("../img/PA.png")

const Merch = () => {
  return (
    <div className="bg-white border-gray-200 border-2 rounded-lg mr-4 ml-4 mb-2 p-2" >
        <h1 className='text-black font-bold mb-2'> Support this project! </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            <a className="block mb-1 rounded-md hover:border-2" href="https://johnyj25s-store.creator-spring.com/listing/pap-hat?product=764">
                <Image src={PAP} />
                <p className='text-center underline mb-1'> Pack-a-punch Hat</p>
            </a>
            <a className="hidden sm:block mb-1 rounded-md hover:border-2" href="https://johnyj25s-store.creator-spring.com/listing/perkaholics-anon-december-2020?product=212">
                <Image src={PA} />
                <p className='text-center underline mb-1'> Perk-a-holics Anonymous</p>
            </a>
            <a className="hidden md:block sm:hidden mb-1 rounded-md hover:border-2" href="https://johnyj25s-store.creator-spring.com/listing/the-zombie-killer-tee?product=2">
                <Image src={ZK} />
                <p className='text-center underline mb-1'> Zombie Killer Tee</p>
            </a>
        </div>
        <p className='text-gray-700 mb-4 ml-0 leading-7 text-center'> 
            Runing and maintaining the servers and database powering this project cost money. Consider supporing the future of this project by buying some merch at
            <a className="underline ml-1" href="https://johnyj25s-store.creator-spring.com/">JohnyJ25.com</a>
        </p>
    </div>
  )
}

export default Merch