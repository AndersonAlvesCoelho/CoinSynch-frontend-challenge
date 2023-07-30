import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'

export default function About() {
  const listAbout = [
    {
      title: 'Crypto Solutions',
      subTitle: 'For your company',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
      icon: '/icons/btc.svg',
    },
    {
      title: 'Crypto Solutions',
      subTitle: 'For your company',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
      icon: '/icons/crypto-currency.svg',
    },
    {
      title: 'Crypto Solutions',
      subTitle: 'For your company',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
      icon: '/icons/line-chart.svg',
    },
    {
      title: 'Crypto Solutions',
      subTitle: 'For your company',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
      icon: '/icons/monitor-smartphone.svg',
    },
  ]

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-[#F7F7F7] w-full py-14 md:py-32"
    >
      <div className="container mx-auto flex flex-col-reverse lg:flex-row  gap-8">
        <div className="w-full md:w-4/5 flex md:grid grid-cols-2 gap-8 overflow-x-auto md:overflow-hidden no-scrollbar py-4">
          {listAbout.map((item, index) => (
            <Card
              key={index}
              className={`w-52 md:w-72 pt-6 ${
                index >= 2 ? 'ml-0 md:ml-10' : ''
              }`}
            >
              <CardHeader>
                <Image
                  alt={`Icon de ${item.title}`}
                  src={item.icon}
                  width={0}
                  height={0}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h2 className="text-primary-500 text-sm md:text-base font-bold">
                  {item.subTitle}
                </h2>
                <h1 className="text-secondary-500 text-xl md:text-2xl font-bold">
                  {item.title}
                </h1>
                <p className="font-normal text-sm text-secondary-500">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-primary-500 text-base font-bold">Lorem ipsum</h2>
          <h1 className="text-secondary-500 text-2xl font-bold">Lorem ipsum</h1>
          <p className="font-normal text-sm text-secondary-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>

          <Button className="mt-6 hidden lg:block">Sign up now</Button>
        </div>
      </div>
    </section>
  )
}
