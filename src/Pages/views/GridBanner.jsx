import React from 'react'

const GridBanner = () => {
  return (
    <div id='gridBanner' className='overflow-hidden my-5'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center px-8 md:px-10 lg:px-24">
            <div id="Lookbook" className='flex flex-col'>
                <div className="border-2 m-5 overflow-hidden">
                    <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/ban11_2x_98a9833d-00a0-4093-bd47-449aeb385ae5_1080x.jpg?v=1581761839" alt="bannerGrid1" className='hover:scale-110 transition duration-1000' />
                </div>
            </div>
            <div id="summerSale">
                <div className="border-2 m-5 overflow-hidden">
                    <img src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/ban12_2x_bc6d3370-26aa-4413-ad72-71ab2161187f_1080x.jpg?v=1581761856" alt="bannerGrid2" className='hover:scale-110 transition duration-1000'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GridBanner