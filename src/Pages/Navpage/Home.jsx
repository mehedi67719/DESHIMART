import React from 'react';
import { Link } from 'react-router';
import banner from '../../assets/banner.png'
import {
    FiHome,
    FiTrendingUp,
    FiUsers,
    FiDollarSign,
    FiArrowRight,
    FiStar,
    FiWind, FiBox, FiTarget,
    FiGrid, FiActivity, FiLayers,
    FiShield,
    FiTruck,
    FiCreditCard,
    FiHeadphones,
    FiRefreshCw,
    FiAward,
    FiClock,
    FiHeart,
    FiCheckCircle,
    FiRotateCcw,



} from "react-icons/fi";


const Home = () => {



    const cardStyle = "bg-white border border-gray-100 hover:shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:border-orange-200 transition-all shadow-sm";
    const iconBg = "w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl text-orange-500 mb-4 relative";

    const categories = [

        { id: 2, name: "Ice and Cold", icon: <FiWind /> },
        { id: 3, name: "Vegetables", icon: <FiLayers /> },
        { id: 4, name: "Meat", icon: <FiBox /> },
        { id: 5, name: "Fish", icon: <FiActivity /> },
        {
            id: 6,
            name: "Fruit",
            icon: <FiTarget />,
            isHot: true,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        { id: 7, name: "Fast Food", icon: <FiGrid /> },
        { id: 8, name: "Dry Food", icon: <FiBox /> },
    ];

    const stats = [
        { label: "Active Vendors", value: "500+" },
        { label: "Monthly Orders", value: "10K+" },
        { label: "Success Rate", value: "98%" },
    ];

    const features = [
        {
            title: "Your Storefront",
            desc: "Create your own digital store",
            icon: <FiHome />,
        },
        {
            title: "Grow Sales",
            desc: "Reach thousands of customers",
            icon: <FiTrendingUp />,
        },
        {
            title: "Customer Base",
            desc: "Access our loyal community",
            icon: <FiUsers />,
        },
        {
            title: "Earn More",
            desc: "Competitive commission rates",
            icon: <FiDollarSign />,
        },
    ];



    return (

        <div>

            {/* banner */}


            <div className='relative max-w-full overflow-hidden'>
                <img
                    src={banner}
                    className='w-full h-full object-cover'
                    alt="Fresh Deshi Products"
                />
                <div className='absolute inset-0 flex animate-pulse flex-col items-end justify-center px-[10%] bg-gradient-to-r from-transparent to-black/10'>
                    <div className='text-right animate-fadeIn'>
                        <button className='lg:mt-50 md:mt-35 mt-15 lg:mr-70 bg-green-500 text-white lg:py-4 lg:px-10 md:py-4 md:px-10 py-2 px-5 text-xl font-bold rounded-full shadow-xl hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 active:scale-95'>
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>





            <div className='my-10 lg:max-w-[70%] mx-auto md:max-w-[95%] max-w-[98%]  px-4'>
                <h2 className='text-6xl font-bold text-black text-center mt-20'>Featured Products</h2>
                <p className='text-gray-700 text-center mt-5'>Discover our carefully curated selection of premium products</p>

                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex md:flex-row  flex-col lg:flex-row items-center gap-4'>
                            <h2 className='text-3xl font-bold md:items-start items-center lg:items-start'>Vegetables</h2>
                            <div className='bg-red-100  p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
                        <div className=' border-gray-200 border  rounded-2xl shadow p-5 min-w-[250px] bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>



                {/* electronics */}
                <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                    <div className='flex items-center justify-between'>
                        <div className='flex md:flex-row  flex-col lg:flex-row items-center gap-4'>
                            <h2 className='text-3xl font-bold md:items-start items-center lg:items-start'>Vegetables</h2>
                            <div className='bg-red-100  p-1 rounded-2xl'>
                                <p className='text-green-500 font-bold'>10 products</p>
                            </div>
                        </div>
                        <Link className='text-green-500 font-bold'> View More ➡️</Link>
                    </div>


                    <hr className='text-gray-200 mt-2' />

                    <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
                        <div className=' border-gray-200 border  rounded-2xl shadow p-5 min-w-[250px] bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREhUSExIVFhUVFRUVFRUVFRUVFRUVFRUWFxUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0fHR0tLS0tLS0tLS0tLS0tLSstKy0tLS0tLS0tLS0tLy0tLSstKy0tLS0rLS8tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAD0QAAIBAgMFBgQDBwMFAQAAAAABAgMRBCExBRJBUWEGEyJxgZEyobHRweHwFBUjQlKS8VNigjNDcsLSFv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAAjEQEBAAMAAgMBAAIDAAAAAAAAAQIDERIhBDFBIhNRFDJh/9oADAMBAAIRAxEAPwD7gzUywkBkAAAAAMNGQAAAAAMDDZhIykZsAAAAAADVI2AAAAADDYC4SCRkAAAAAAwwkZsAAAAAAAAAAAYAwmYNkAAAAAAAYk0s3ocvtrtbGHho5v8Aq/8AlcfMLNerLZeYx0tatGCvKSS6uxUYrtPRjlG8n7I4itjKlZ3nJs3pUm9CFyehh8CT/vXS1O0838MUvn839jye2qz/AJvoiuo4ST6ElYQquyp3Rqx/Ht+863+p82ZjtWqv+4/n9yPKnbgeMpNcCF22E0438WtPbtRcb+cfsT8P2hg/iVuq+zOXnVZGnXZGfJcvw8cvx9Fw+KhUzjJPpx9tT2PmdPHyi7p2tydjodldqdI1f7uP5l+G7HJk2/Dzw9z26sxY1pVYySlFpp8UblzIAAAAYuBkGImQAAAAAAAAAAAGoZlIAkZAAAGLgGzzqVFFOUnZLNt6I3OB7b9obfw46cFzfN/r8+WrtGm7c/GPHtT2nlVfd08ocFxl1l06FDQg9ZN3IWHv8Us2y72fhv5peiK7evosNOGnDke+Dwrl0Rd4XCJHnhaVy0o2WSzOXFl3bf8ATWFA37kkRgZ3SFwYrnUKpTXIhVorkWk4EeeHT4lGeKzDPimqvoiJVl5E3E1KeinB+UkV1aSRkvet2Ht5Pp+B57y5W+gq1TxdQTKxbcOr7Ym150Xk7wesb5fkzu8JiY1YqcXdP3T5M+VUZxfGzL3Ye1ZUJK+cHr5eXBm3R8j8ry/lfG77n274GtOopJSTumrp9DLZueWNhIIyAAAAAxcBcyYSMgAAAAAAAAAABi5gzYN2VwKbtNtJUaTV82vkfGtoY91Kjm3lfL7nUdu9qOcnFPXL05fh6HFyV5JcEVZ5PpPgfH/x4S37q62a7+J+h0+zob1m9Ecpgp38kdRsmsnm3kiODT8ify6ChByyWS+bJ8EkrIrqWKvpoSadS+S/Jepc8jZKl7x51MRbTPyz/wAGVDm/b7mk7JFd9qZxGq1peXzZXYqTeTb8ru3qlkT69RIpMbiuCMm76bNOPb6iHiZcytrV1wSN8TVvxIaMXI9TDDk9vTvnzfu/ueVScv8Ad6SaJ2GoJkxYOPIljjEctuOLnU7Z5/3O5vRxs4yuqkl0fih/a9PSxb18AuFymxNBosk4jbjnH0PsRtvf/hSaTeiWl+nFJ8jskfC9n4qVOalHJritVbQ+xdndrLFUVP8Am0kuvPyZu0bOzxrwvm/H8MvKfVWYANLAAGoGWwkEjIAAAAAAAAAAw2BkGsZ3v01+oc1e3GzforfcDYg7br7lCb6W/udvxJxyXb7HONPu42va7V87yvupf2y9iOeXjOrvj4eezHF832jUc5Nvi2yvlSztxf0LJ0bvpe1+kcn8972ZpWSinza15GC7e19bOR5NNRjb1LXZdTLPJLUh7Ppu2fw9ebT0XPU1niHeyyS4fd8S7HLiF/r06zC42+XDl92W1HEJcfTgcVg8Xwv7cS4w+Kvovcvxsefu1e3Ryxh4VcUVve2V2yJidpRS1FqnDT1OxOIKTF4pK5DxW1d7QqcRiW+hg3216GnV4/aXWxaMUqt2VnfLme9CtyRn8WjKuiwc0XNCF0c1hKtuJf4DELjIt1xg39SKuHdijx2H10OojOLRXY+mi3LBTq2WVxtVbrOt7BbR7qsot+Gr4ZdGruL+q9TnNoRz0JGwazjUj5/UYXl60b8ZnrsfaQc7T2+6a8a3kuN8/XmemD7W4Wct2U+7lwVRxV/JptG2bcL+vn7o2ffF8RMTtKlTkoymlJ8M2/loV2L7TUoStBOoraxatfkuZzs5ynUdVwTb03puKguPhinvO99XyKd3yfGfx7qzX8bK+8vUdl+86Vrxkn00fswtoRuk1bedr8LvQ5GFeMMo2V9bXz9X9z2pVnN2zfJdeFirH5OVqOWrn67QGsMkvJBs3qG1wYsAMgGGwDMWCRsB5VI5+Fre66Ndfued5719zNpL4lbJvTjx5Ehq5U7Q2lCnGUakHUlFpRjCO/KbllFWXwy56c9NIZXjsnUutjHFb0otRv78LZ/C78z5r2mx1WeNdOS3aLbmq09zKCpuShQtw/gzbqWbWS5F5tTbNTC1ILERUU4SqSa/iRotRqOznLpGMd6+bnlkUGGrqEZSsu4lJuEK1OMZ0Zbt68XGUVZPdjaz3X3maZm2Z2+q1ap4XsUs6qhBytluqMElaLyyUea104XeVxs67V52vq3wv0R5YnEVKkaMpVu8nepRqyae+qkJt93aeiavLeSV1aySiSoZrK117L7szc8a+g15zPXKlV1GMblXWjKT4r6sn99Fau7K7aGMtp8vuTnXcK9aUVH4n+LJlLHpfCm/O5zE8UzWGPktPmX4dM5K6mviZPWVui1+RXVsbFcvNlNUxlSSs27fL5ZEdvmyVrmM4sa2PIdWu2RpzPN1imzqVzkS4PiSKeIsVPfntTqdCPgruyOgw+IXMscLjEtGcvCuTaFdnPHiFsrtcPj1bUYjHXVjmaeKaWpt+0NjtV+E71Jxc7sk7Ij4l+RXbzZb7Jp2efQ51PPL+av6tTmyBiY0ZJqTXsSMXSb6FTiKKXmVZ96z6pP9pOHVKC8MpPyyt7EinVdrJfi/mVdCWdopfU6vY+wak1drcX9T1/4o7hryy9RzfnjjP6qspUG3nr7nWdn8Du+JxslpdZt8/In4PZFKlmo3fOWb+xOZs0/G8PdeTs2S+oMJBIya1IAABrY2AAAAQMRKpUk4U3uQWU6mTk3/AE008k+cne2iTd2qbGwo0q7Uk+7oUO83bvx1cTOVPek27ynaDV2/52y82W/A09VUqp+bqSf0afqV+1NlKvOsnk5U6Lg+CnTlWabXFJzT9UVZS2elmN5eOL7YVajlJUY08ZGUe7nFzU0kpWVObjnfdnJ71m1xbyOerU92pPDuNK1R7qhGpWr1G6kHOac6kt2hC1F+FZvdXwnWbewFadCb3Y040pSp0+5juLeiv+q4Xe+lJNLNdUcZSxKdN1qyq4dxTlNUVGUtx1VBb0GtZKMU5wtx1TTM9l6vlR6WCjCGJu3Z4ik4xqOrTior9pUYuU7OcpRgpeHhOK0QVSTSSyVtMlc8MRtX9piobzp0KcnTpQtNveuneTrQe9U8N3a2Tlla5Lnhck7LzUVZ+e7p5HLP69vT+Jf4eVKm75Ne5tiKVwoLp6OxJiss0S8Wi5cU1SglqiPUmloi7rU4shzox5E5wuyq91G+B4zkT5xREqxR28RuWVQ6kiPNMmNLkzDkv6TnpXfJCjFkqnFvibp/7UbRv+kjlR9vWnBE2jurUiQi+ZIpUyupyJ0K8eR7Rnc8KNEm0oIr4n9JOHhzLvZ2XyKvC07l3s+HiViUwU7L6W2JoN2SV27dXoaR7H1qji5SjCLvvauaXCy0v6nU7KwaS33q1l0X5liaJoxvuvLvycsfWKo2T2coYfOMXKX9U3d+i0Xoi3AL5jJ9M+WWWV7lesMJGQdRAAAAAFZtvajw+47Qs97e35ONlFJ5NJ245uy0u1csoSuk+av7nPds52hT1zlKLtWVHJxzzfxZXyeXPgdBT0XkgNgDFwIWKpzhLvaav/qU+M0srw5TS97W5M0rPvoxq0ZJyg3bPJ8J058r2tno0uRYWPGGEjGbqLJyVpJaSa0k1/UtL9fK0bHeuW7RYZ1IVMTVvUp0pLco724qG6lvVp5Z1Yu7u7pLNXOF2hSSVZ0XGbTjB0p7zpve3VNxe5vR3qbfw3TeavZ3+u4vCyclOG7mt2pGV92pD00azzt0OLwuyE6qksnKm5Jbsko91Ue4kmrW7ucdL/DrmZ9svYv12cfNtt4GdOtCUakpUqjlkpNxVTdbmqkc4bzVs8r5NalvsrxUv+T1b/H6Ftiez0oSqqKlOEtyolZ7u/KSg5Jv4W7NX87uyI0dnuEXHivZ8v1+RX+x6fxsp42IFWiuRiErfme86yvaS9eIlS4p3Lpi0deUpLijylGB6SiiPUp9TviNKtKHP5kOth4nrVuR5X4o5Yl9PL9njqeVSnE2qz6HjdciPjXOxncXM2VuYiiRSpIjcaeilYk05JcPkbQorkeqwnUruCXnG9KdybSsRaOHLDD00dmKGWUTMMi82NR3pxitW7FPSOs7HYbOVV6R8K6yevsvqW4fcjJvy8cLXXxjZJLhkZPPvQqhq48dvcyYRkAAAAAAAADm+2sLwpq0nebXgpwm02svjTVtcsr2159FT0Xkjnu2lJShTi7ZykldSbbcGt3wyjk1fn5HQ01kvJfQDLZhIzYyAAAHliaqhCUnwT9eSXUr8Rs9OlTcvjowvFrmoWlH/wAXoyZiIb04LOybm+V45RT9ZX/4nvK2hGzvXZeIOJw/gjJRu4rOKycou28l1yTXVI5Pa2zJJd5lKLtuzSS3oyV7NLQ7DAXinTd/Bkm/5ofyO/F2yfVG2KUZxcZK6Zy4TJZr23CvkGPw/FZr5/5IcXbNO6Ov2xs505vinmnz/PocxWo7ry46rg/ISPX17JlPTWM09f16mKlFf5NUlw15GynwZ24p+XEadDmv15kWrT5FjKVzwnYhfSUvVZKka910J0rBehC13nUWFBciRClY9VI3tzZC5OeGTWMbam17ju1zPWnTSIdd8OPTDwJ1NHhT6K3VmIVHKSjHxNuy8+iOdtQqz2fRlVmoR1er5Li2d5ht2nFQirKKsvu+pQ7GwqoQtrOXxP8A9V0RZRqmvTr8Z2/byfk7v8l5PqLONYkU6hV05EulI0cZVhCoeqZDpsl09CNjrYNhmpEDYJAAAAKbtLVpRhF1XRUU7rvYym95aOCi73zt5tLiW1BvdW9a9leyaXomUXbGpairX3nK0bfF8MnJLhmlbpqrtJF9T0XkvoBsAAAAAM1sbADSoQq0idNXIlWmSgqcfTU4uL9+KfNHFbVwrjKz14cpdVyfQ72vSKXaWG3k01dcmcuK/TtuFcJVh+uKPCUn5/Us9oYRweV2uT1Xk+JVycZcfuvNELbHp69uObXfRqxKPVP6nnJdCFyaPGN9wx3JqpWDqELYe59PRUbasXXM8ZTuebkyq4x3zyiZ3iXAxLG8kiFJ82WOA2TOpm1ux5y1fkhMOqs9mOPvKtKXeVWoq8nyR1ux9nRoq7zm9XwXSP3NcDhYUo2gvNvV+bJcZGnXrk9vN3b7n6n0lxmSKRFpRJ9CBdGSpNImUkeFKBNpQJovSnElwVkedKB6tELXWDZCwIgAAAAAou10KSpKdSn3iT3d11O7TU2r3u7Ss4xaT4xT4F3T0Xkvoc923helF93KVm/HGMJbicWrNSa1+drZbx0NH4V5L6AbAGGwFzJhIyAAAA1lC5sYbAi1KRBr4O/AuLGHBEujjtobKTTyOO2v2dle8bp81kz61Vw1yvxGzk+A+08c+PheNWKo8FNdVZ+6K99oHHKVKS8ndH27GbCjLWK9jn8b2Ppyv4UQuuNGPys5+vmK7S0+TXmmZXaKn+kzscV2Bi80rEP/APA2I/4ln/Mz/wDHNLbW98MX7fcmYVznzXkdLhux6jwLXD7BUeAmqIZfJ2X9U+zcEo5qOfN5v05F7QgyZR2dbgS6WDLJjxnyy79odOmSqVEl0sGTaWEJcR6i0aJPo0j2pYboTKVA79I2vKlSJlKmbQp2PREbRkAEQAAAA1ANmDawAhbV2VTxKSqX8LvFp6PJ33XeMtF8SZOSAAwEgAMgAAAANbmUjAA2AAAw0AB4zopnlLCIA7KPKWCR5y2cuQBLrjT92roY/d6AOgsB0PWOCAHR6wwh7RwwBy5UesaSN0gCHXWDZAAAAADAA1NgAAAA/9k=" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,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" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>
                        <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                            <div className='flex flex-col'>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                            </div>
                            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREhUSExIVFhUVFRUVFRUVFRUVFRUVFRUWFxUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0fHR0tLS0tLS0tLS0tLS0tLSstKy0tLS0tLS0tLS0tLy0tLSstKy0tLS0rLS8tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EAD0QAAIBAgMFBgQDBwMFAQAAAAABAgMRBCExBRJBUWEGEyJxgZEyobHRweHwFBUjQlKS8VNigjNDcsLSFv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAAjEQEBAAMAAgMBAAIDAAAAAAAAAQIDERIhBDFBIhNRFDJh/9oADAMBAAIRAxEAPwD7gzUywkBkAAAAAMNGQAAAAAMDDZhIykZsAAAAAADVI2AAAAADDYC4SCRkAAAAAAwwkZsAAAAAAAAAAAYAwmYNkAAAAAAAYk0s3ocvtrtbGHho5v8Aq/8AlcfMLNerLZeYx0tatGCvKSS6uxUYrtPRjlG8n7I4itjKlZ3nJs3pUm9CFyehh8CT/vXS1O0838MUvn839jye2qz/AJvoiuo4ST6ElYQquyp3Rqx/Ht+863+p82ZjtWqv+4/n9yPKnbgeMpNcCF22E0438WtPbtRcb+cfsT8P2hg/iVuq+zOXnVZGnXZGfJcvw8cvx9Fw+KhUzjJPpx9tT2PmdPHyi7p2tydjodldqdI1f7uP5l+G7HJk2/Dzw9z26sxY1pVYySlFpp8UblzIAAAAYuBkGImQAAAAAAAAAAAGoZlIAkZAAAGLgGzzqVFFOUnZLNt6I3OB7b9obfw46cFzfN/r8+WrtGm7c/GPHtT2nlVfd08ocFxl1l06FDQg9ZN3IWHv8Us2y72fhv5peiK7evosNOGnDke+Dwrl0Rd4XCJHnhaVy0o2WSzOXFl3bf8ATWFA37kkRgZ3SFwYrnUKpTXIhVorkWk4EeeHT4lGeKzDPimqvoiJVl5E3E1KeinB+UkV1aSRkvet2Ht5Pp+B57y5W+gq1TxdQTKxbcOr7Ym150Xk7wesb5fkzu8JiY1YqcXdP3T5M+VUZxfGzL3Ye1ZUJK+cHr5eXBm3R8j8ry/lfG77n274GtOopJSTumrp9DLZueWNhIIyAAAAAxcBcyYSMgAAAAAAAAAABi5gzYN2VwKbtNtJUaTV82vkfGtoY91Kjm3lfL7nUdu9qOcnFPXL05fh6HFyV5JcEVZ5PpPgfH/x4S37q62a7+J+h0+zob1m9Ecpgp38kdRsmsnm3kiODT8ify6ChByyWS+bJ8EkrIrqWKvpoSadS+S/Jepc8jZKl7x51MRbTPyz/wAGVDm/b7mk7JFd9qZxGq1peXzZXYqTeTb8ru3qlkT69RIpMbiuCMm76bNOPb6iHiZcytrV1wSN8TVvxIaMXI9TDDk9vTvnzfu/ueVScv8Ad6SaJ2GoJkxYOPIljjEctuOLnU7Z5/3O5vRxs4yuqkl0fih/a9PSxb18AuFymxNBosk4jbjnH0PsRtvf/hSaTeiWl+nFJ8jskfC9n4qVOalHJritVbQ+xdndrLFUVP8Am0kuvPyZu0bOzxrwvm/H8MvKfVWYANLAAGoGWwkEjIAAAAAAAAAAw2BkGsZ3v01+oc1e3GzforfcDYg7br7lCb6W/udvxJxyXb7HONPu42va7V87yvupf2y9iOeXjOrvj4eezHF832jUc5Nvi2yvlSztxf0LJ0bvpe1+kcn8972ZpWSinza15GC7e19bOR5NNRjb1LXZdTLPJLUh7Ppu2fw9ebT0XPU1niHeyyS4fd8S7HLiF/r06zC42+XDl92W1HEJcfTgcVg8Xwv7cS4w+Kvovcvxsefu1e3Ryxh4VcUVve2V2yJidpRS1FqnDT1OxOIKTF4pK5DxW1d7QqcRiW+hg3216GnV4/aXWxaMUqt2VnfLme9CtyRn8WjKuiwc0XNCF0c1hKtuJf4DELjIt1xg39SKuHdijx2H10OojOLRXY+mi3LBTq2WVxtVbrOt7BbR7qsot+Gr4ZdGruL+q9TnNoRz0JGwazjUj5/UYXl60b8ZnrsfaQc7T2+6a8a3kuN8/XmemD7W4Wct2U+7lwVRxV/JptG2bcL+vn7o2ffF8RMTtKlTkoymlJ8M2/loV2L7TUoStBOoraxatfkuZzs5ynUdVwTb03puKguPhinvO99XyKd3yfGfx7qzX8bK+8vUdl+86Vrxkn00fswtoRuk1bedr8LvQ5GFeMMo2V9bXz9X9z2pVnN2zfJdeFirH5OVqOWrn67QGsMkvJBs3qG1wYsAMgGGwDMWCRsB5VI5+Fre66Ndfued5719zNpL4lbJvTjx5Ehq5U7Q2lCnGUakHUlFpRjCO/KbllFWXwy56c9NIZXjsnUutjHFb0otRv78LZ/C78z5r2mx1WeNdOS3aLbmq09zKCpuShQtw/gzbqWbWS5F5tTbNTC1ILERUU4SqSa/iRotRqOznLpGMd6+bnlkUGGrqEZSsu4lJuEK1OMZ0Zbt68XGUVZPdjaz3X3maZm2Z2+q1ap4XsUs6qhBytluqMElaLyyUea104XeVxs67V52vq3wv0R5YnEVKkaMpVu8nepRqyae+qkJt93aeiavLeSV1aySiSoZrK117L7szc8a+g15zPXKlV1GMblXWjKT4r6sn99Fau7K7aGMtp8vuTnXcK9aUVH4n+LJlLHpfCm/O5zE8UzWGPktPmX4dM5K6mviZPWVui1+RXVsbFcvNlNUxlSSs27fL5ZEdvmyVrmM4sa2PIdWu2RpzPN1imzqVzkS4PiSKeIsVPfntTqdCPgruyOgw+IXMscLjEtGcvCuTaFdnPHiFsrtcPj1bUYjHXVjmaeKaWpt+0NjtV+E71Jxc7sk7Ij4l+RXbzZb7Jp2efQ51PPL+av6tTmyBiY0ZJqTXsSMXSb6FTiKKXmVZ96z6pP9pOHVKC8MpPyyt7EinVdrJfi/mVdCWdopfU6vY+wak1drcX9T1/4o7hryy9RzfnjjP6qspUG3nr7nWdn8Du+JxslpdZt8/In4PZFKlmo3fOWb+xOZs0/G8PdeTs2S+oMJBIya1IAABrY2AAAAQMRKpUk4U3uQWU6mTk3/AE008k+cne2iTd2qbGwo0q7Uk+7oUO83bvx1cTOVPek27ynaDV2/52y82W/A09VUqp+bqSf0afqV+1NlKvOsnk5U6Lg+CnTlWabXFJzT9UVZS2elmN5eOL7YVajlJUY08ZGUe7nFzU0kpWVObjnfdnJ71m1xbyOerU92pPDuNK1R7qhGpWr1G6kHOac6kt2hC1F+FZvdXwnWbewFadCb3Y040pSp0+5juLeiv+q4Xe+lJNLNdUcZSxKdN1qyq4dxTlNUVGUtx1VBb0GtZKMU5wtx1TTM9l6vlR6WCjCGJu3Z4ik4xqOrTior9pUYuU7OcpRgpeHhOK0QVSTSSyVtMlc8MRtX9piobzp0KcnTpQtNveuneTrQe9U8N3a2Tlla5Lnhck7LzUVZ+e7p5HLP69vT+Jf4eVKm75Ne5tiKVwoLp6OxJiss0S8Wi5cU1SglqiPUmloi7rU4shzox5E5wuyq91G+B4zkT5xREqxR28RuWVQ6kiPNMmNLkzDkv6TnpXfJCjFkqnFvibp/7UbRv+kjlR9vWnBE2jurUiQi+ZIpUyupyJ0K8eR7Rnc8KNEm0oIr4n9JOHhzLvZ2XyKvC07l3s+HiViUwU7L6W2JoN2SV27dXoaR7H1qji5SjCLvvauaXCy0v6nU7KwaS33q1l0X5liaJoxvuvLvycsfWKo2T2coYfOMXKX9U3d+i0Xoi3AL5jJ9M+WWWV7lesMJGQdRAAAAAFZtvajw+47Qs97e35ONlFJ5NJ245uy0u1csoSuk+av7nPds52hT1zlKLtWVHJxzzfxZXyeXPgdBT0XkgNgDFwIWKpzhLvaav/qU+M0srw5TS97W5M0rPvoxq0ZJyg3bPJ8J058r2tno0uRYWPGGEjGbqLJyVpJaSa0k1/UtL9fK0bHeuW7RYZ1IVMTVvUp0pLco724qG6lvVp5Z1Yu7u7pLNXOF2hSSVZ0XGbTjB0p7zpve3VNxe5vR3qbfw3TeavZ3+u4vCyclOG7mt2pGV92pD00azzt0OLwuyE6qksnKm5Jbsko91Ue4kmrW7ucdL/DrmZ9svYv12cfNtt4GdOtCUakpUqjlkpNxVTdbmqkc4bzVs8r5NalvsrxUv+T1b/H6Ftiez0oSqqKlOEtyolZ7u/KSg5Jv4W7NX87uyI0dnuEXHivZ8v1+RX+x6fxsp42IFWiuRiErfme86yvaS9eIlS4p3Lpi0deUpLijylGB6SiiPUp9TviNKtKHP5kOth4nrVuR5X4o5Yl9PL9njqeVSnE2qz6HjdciPjXOxncXM2VuYiiRSpIjcaeilYk05JcPkbQorkeqwnUruCXnG9KdybSsRaOHLDD00dmKGWUTMMi82NR3pxitW7FPSOs7HYbOVV6R8K6yevsvqW4fcjJvy8cLXXxjZJLhkZPPvQqhq48dvcyYRkAAAAAAAADm+2sLwpq0nebXgpwm02svjTVtcsr2159FT0Xkjnu2lJShTi7ZykldSbbcGt3wyjk1fn5HQ01kvJfQDLZhIzYyAAAHliaqhCUnwT9eSXUr8Rs9OlTcvjowvFrmoWlH/wAXoyZiIb04LOybm+V45RT9ZX/4nvK2hGzvXZeIOJw/gjJRu4rOKycou28l1yTXVI5Pa2zJJd5lKLtuzSS3oyV7NLQ7DAXinTd/Bkm/5ofyO/F2yfVG2KUZxcZK6Zy4TJZr23CvkGPw/FZr5/5IcXbNO6Ov2xs505vinmnz/PocxWo7ry46rg/ISPX17JlPTWM09f16mKlFf5NUlw15GynwZ24p+XEadDmv15kWrT5FjKVzwnYhfSUvVZKka910J0rBehC13nUWFBciRClY9VI3tzZC5OeGTWMbam17ju1zPWnTSIdd8OPTDwJ1NHhT6K3VmIVHKSjHxNuy8+iOdtQqz2fRlVmoR1er5Li2d5ht2nFQirKKsvu+pQ7GwqoQtrOXxP8A9V0RZRqmvTr8Z2/byfk7v8l5PqLONYkU6hV05EulI0cZVhCoeqZDpsl09CNjrYNhmpEDYJAAAAKbtLVpRhF1XRUU7rvYym95aOCi73zt5tLiW1BvdW9a9leyaXomUXbGpairX3nK0bfF8MnJLhmlbpqrtJF9T0XkvoBsAAAAAM1sbADSoQq0idNXIlWmSgqcfTU4uL9+KfNHFbVwrjKz14cpdVyfQ72vSKXaWG3k01dcmcuK/TtuFcJVh+uKPCUn5/Us9oYRweV2uT1Xk+JVycZcfuvNELbHp69uObXfRqxKPVP6nnJdCFyaPGN9wx3JqpWDqELYe59PRUbasXXM8ZTuebkyq4x3zyiZ3iXAxLG8kiFJ82WOA2TOpm1ux5y1fkhMOqs9mOPvKtKXeVWoq8nyR1ux9nRoq7zm9XwXSP3NcDhYUo2gvNvV+bJcZGnXrk9vN3b7n6n0lxmSKRFpRJ9CBdGSpNImUkeFKBNpQJovSnElwVkedKB6tELXWDZCwIgAAAAAou10KSpKdSn3iT3d11O7TU2r3u7Ss4xaT4xT4F3T0Xkvoc923helF93KVm/HGMJbicWrNSa1+drZbx0NH4V5L6AbAGGwFzJhIyAAAA1lC5sYbAi1KRBr4O/AuLGHBEujjtobKTTyOO2v2dle8bp81kz61Vw1yvxGzk+A+08c+PheNWKo8FNdVZ+6K99oHHKVKS8ndH27GbCjLWK9jn8b2Ppyv4UQuuNGPys5+vmK7S0+TXmmZXaKn+kzscV2Bi80rEP/APA2I/4ln/Mz/wDHNLbW98MX7fcmYVznzXkdLhux6jwLXD7BUeAmqIZfJ2X9U+zcEo5qOfN5v05F7QgyZR2dbgS6WDLJjxnyy79odOmSqVEl0sGTaWEJcR6i0aJPo0j2pYboTKVA79I2vKlSJlKmbQp2PREbRkAEQAAAA1ANmDawAhbV2VTxKSqX8LvFp6PJ33XeMtF8SZOSAAwEgAMgAAAANbmUjAA2AAAw0AB4zopnlLCIA7KPKWCR5y2cuQBLrjT92roY/d6AOgsB0PWOCAHR6wwh7RwwBy5UesaSN0gCHXWDZAAAAADAA1NgAAAA/9k=" alt="" />
                            <h2 className='text-xl font-bold'>Onion</h2>
                            <p>ratting</p>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                <div className='flex items-center gap-1'>
                                    <p className='text-black font-bold text-xl'>$7.00</p>
                                    <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                </div>
                            </div>


                            <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                        </div>



                    </div>

                </div>







                {/* popular products */}


                <div className='border rounded shadow border-gray-200 p-4 mt-25'>
                    <h2 className='text-6xl font-bold text-black text-center '>Popular Products</h2>
                    <div className='flex items-center gap-2 mt-10 overflow-x-scroll'>
                        <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Vegetables</Link>
                        <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Fruits</Link>
                        <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Fish</Link>
                        <Link className='px-5 py-0.5 hover:bg-green-500 active:bg-green-500 font-bold border border-green-500 rounded-4xl'>Spices</Link>
                    </div>

                    <div >

                        {/* <hr className='text-green-500 mt-2' /> */}

                        {/* electronics */}
                        <div className='mt-20 border border-gray-200 p-4 shadow-xl rounded-2xl'>
                            <div className='flex items-center justify-between'>
                                <div className='flex md:flex-row  flex-col lg:flex-row items-center gap-4'>
                                    <h2 className='text-3xl font-bold md:items-start items-center lg:items-start'>Vegetables</h2>
                                    <div className='bg-red-100  p-1 rounded-2xl'>
                                        <p className='text-green-500 font-bold'>10 products</p>
                                    </div>
                                </div>
                                <Link className='text-green-500 font-bold'> View More ➡️</Link>
                            </div>




                            <div className='  mt-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
                                <div className=' border-gray-200 border  rounded-2xl shadow p-5 min-w-[250px] bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="data:image/jpeg;base64,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" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="data:image/jpeg;base64,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" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="data:image/jpeg;base64,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" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>
                                <div className=' border-gray-200 border rounded-2xl shadow p-2 bg-white'>
                                    <div className='flex flex-col'>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-green-500 text-white'>new</p>
                                        <p className='px-1 py-0.5 w-12 border rounded-xl bg-red-500 text-white'>-10%</p>
                                    </div>
                                    <img src="data:image/jpeg;base64,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" alt="" />
                                    <h2 className='text-xl font-bold'>Onion</h2>
                                    <p>ratting</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-green-500 font-bold text-xl'>$6.30</p>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-black font-bold text-xl'>$7.00</p>
                                            <p className='px-2 py-0.5 bg-red-300 border rounded'>-10%</p>
                                        </div>
                                    </div>


                                    <button className='py-2 mt-5 rounded-xl w-full border border-green-500  hover:bg-green-500 hover:text-white animate-none'>add to Cart</button>
                                </div>



                            </div>

                        </div>







                    </div>
                </div>




                <section className="w-full mt-20 rounded-2xl py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


                        <div className="space-y-8">

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] text-green-500 text-sm font-medium">
                                <FiStar className="fill-current" />
                                Join Our Selling Community
                            </div>


                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                    Start Selling on <span className="text-green-500">DESHIMART</span>
                                </h1>
                                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
                                    Turn your passion into profit. Join thousands of successful vendors who trust DESHIMART to grow their business and reach new customers every day.
                                </p>
                            </div>


                            <div className="flex flex-wrap gap-4">
                                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-green-100">
                                    Become a Seller <FiArrowRight strokeWidth={3} />
                                </button>
                                <button className="px-8 py-4 rounded-lg font-bold border-2 border-green-500 text-green-500 hover:bg-green-50 transition-all">
                                    Learn More
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                                {stats.map((stat, index) => (
                                    <div key={index}>
                                        <h3 className="text-2xl md:text-3xl font-bold text-green-500">{stat.value}</h3>
                                        <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col items-center text-center"
                                >
                                    <div className="w-16 h-16 mb-6 flex items-center justify-center bg-green-500 text-white text-3xl rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>






                <section className="mt-25 font-sans">
                    <div className=" w-full text-center">

                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-[1px] w-12 bg-green-500"></div>
                            <h2 className="text-3xl font-bold text-gray-800">Popular Categories</h2>
                            <div className="h-[1px] w-12 bg-green-500"></div>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">
                            Explore our most popular product categories and find what you need <br />
                            <span className="text-green-500 text-xs italic">✨ Curated collections for your convenience</span>
                        </p>

                        <button className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 mx-auto mb-12 hover:bg-green-700 transition-all">
                            <FiGrid /> Browse All Categories <FiArrowRight />
                        </button>


                        <div className="border border-green-100 rounded-[40px] p-8 md:p-12 shadow-sm bg-gradient-to-b from-white to-green-50/20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className={`relative bg-white border ${cat.isHot ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-100'} rounded-2xl p-6 flex flex-col items-center group hover:shadow-lg transition-all duration-300`}
                                    >

                                        {cat.isHot && (
                                            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                Hot
                                            </span>
                                        )}


                                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            {cat.icon}
                                        </div>

                                        <h3 className="font-bold text-gray-800 mb-2">{cat.name}</h3>

                                        {cat.desc ? (
                                            <p className="text-[10px] text-gray-400 mb-4 px-2">{cat.desc}</p>
                                        ) : (
                                            <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                                        )}

                                        <button className="text-xs font-semibold text-green-600 border border-green-600 px-4 py-1.5 rounded-full flex items-center gap-1 hover:bg-green-600 hover:text-white transition-all">
                                            Explore Now <FiArrowRight className="text-[10px]" />
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div>
                                        <h4 className="text-2xl font-bold text-green-600">8+</h4>
                                        <p className="text-xs text-gray-500">Categories</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-orange-400">43+</h4>
                                        <p className="text-xs text-gray-500">Products</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-green-800 font-mono">24/7</h4>
                                        <p className="text-xs text-gray-500">Support</p>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-2 bg-white border border-green-200 px-4 py-1.5 rounded-full shadow-sm text-[11px] text-gray-600">

                                    Discover amazing products in every category

                                </div>
                            </div>
                        </div>
                    </div>
                </section>





                <section className="bg-white mt-20 rounded-2xl py-16 px-4 font-sans">
                    <div className="max-w-6xl mx-auto text-center">


                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="h-[2px] w-10 bg-green-500"></div>
                            <h2 className="text-3xl font-bold text-gray-900">Why Shop With Us</h2>
                            <div className="h-[2px] w-10 bg-green-500"></div>
                        </div>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10">
                            Experience the best online shopping with our commitment to quality, security, and exceptional service
                        </p>


                        <div className="border border-green-100 rounded-[32px] p-6 md:p-12 shadow-sm bg-[#FCFDFB]">


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiShield />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Secure Shopping</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">100% secure payment with SSL encryption</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-blue-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiTruck />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Free Delivery</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Free shipping on orders over $50</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-green-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiCreditCard />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Payments</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Multiple payment options available</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-purple-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiHeadphones />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">24/7 Support</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Dedicated customer support anytime</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/4 h-full bg-orange-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiRefreshCw />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Easy Returns</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">30-day hassle-free return policy</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-pink-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiAward />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Quality Assured</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">100% authentic products guaranteed</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-yellow-600"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiClock />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Fast Processing</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Orders processed within 24 hours</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-indigo-500"></div>
                                    </div>
                                </div>


                                <div className="bg-white hover:shadow-xl p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-4">
                                        <FiHeart />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm mb-2">Best Prices</h3>
                                    <p className="text-[11px] text-gray-400 mb-6">Competitive pricing with great deals</p>
                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="w-1/4 h-full bg-red-500"></div>
                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pt-4">
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">50K+</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Happy Customers</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">100K+</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Products Sold</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">99%</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Satisfaction Rate</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-3xl font-bold text-green-600">24/7</h4>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Customer Support</p>
                                </div>
                            </div>


                            <div className="inline-flex items-center gap-2 bg-white border border-yellow-100 px-6 py-2 rounded-full shadow-sm text-xs font-medium text-gray-700">
                                <FiCheckCircle className="text-green-500 text-base" />
                                Trusted by thousands of satisfied customers worldwide
                                <div className="flex gap-0.5 ml-2">
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                    <FiStar className="fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>






                <section className="bg-white py-12 rounded-2xl mt-25 px-4">

                    <div className="max-w-6xl mx-auto border border-gray-50 rounded-[32px] p-8 md:p-12 shadow-sm">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
                            <p className="text-gray-400 text-sm">We provide the best shopping experience with premium services</p>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiTruck className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Free Delivery</h3>
                                <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiRotateCcw className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Free Return</h3>
                                <p className="text-gray-400 text-[11px]">Free shipping over $100</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiHeadphones className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Customer Support</h3>
                                <p className="text-gray-400 text-[11px]">Friendly 24/7 customer support</p>
                            </div>


                            <div className={cardStyle}>
                                <div className={iconBg}>
                                    <div className="absolute inset-0 bg-orange-100/40 rounded-full blur-sm"></div>
                                    <FiShield className="relative z-10" />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1 text-base">Money Back guarantee</h3>
                                <p className="text-gray-400 text-[11px]">Quality checked by our team</p>
                            </div>

                        </div>


                        <div className="w-full h-[1px] bg-gray-100 mb-8"></div>


                        <div className="flex justify-center">
                            <div className="bg-orange-50/50 border border-orange-100 px-6 py-2 rounded-xl flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                                <p className="text-xs font-semibold text-gray-700">Trusted by thousands of customers worldwide</p>
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                            </div>
                        </div>

                    </div>
                </section>




            </div>




        </div>

    );
};

export default Home;