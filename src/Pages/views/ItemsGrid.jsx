import React from 'react'

const ItemsGrid = () => {
  return (
    <div className='overflow-hidden w-screen'>
        <div className="lg:mx-10 h-fit my-12 grid grid-cols-1 lg:grid-cols-2 p-5 md:p-14 gap-5">
            <div className="w-full h-full overflow-hidden grid justify-items-center">
                <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/young-beautiful-woman-looking-trendy-girl-casual-summer-clothes-positive-funny-model-winking_900x.jpg?v=1606209527" alt="image" className='h-full hover:scale-110 transition duration-1000'/>
            </div>
            <div className="w-full h-full grid grid-cols-2 gap-3 md:gap-5 lg:gap-7 overflow-hidden">
                <div id="col-1" className='flex flex-col justify-between md: h-full w-full overflow-hidden'>
                    <div className="mb-3.5 h-full w-full overflow-hidden">
                        <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/bag2_360x.jpg?v=1581730050" className='h-full hover:scale-125 transition duration-1000 w-full'/>
                    </div>
                    <div className="mt-3.5 h-full w-full overflow-hidden">
                        <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/lemai3020112688_m4_2-0_360x.jpg?v=1606229788" className='h-full hover:scale-125 transition duration-1000 w-full'/>
                    </div>
                </div>
                <div id="col-2" className='mx-3 h-[100%] w-full overflow-hidden'>
                    <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/p24-21_360x.jpg?v=1581731327" className='h-full hover:scale-125 transition duration-1000'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ItemsGrid