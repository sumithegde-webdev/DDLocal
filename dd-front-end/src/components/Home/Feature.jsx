import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'C2C Marketplace',
    description:
    "Enable seamless peer-to-peer transactions by connecting buyers and sellers directly in an online marketplace.",
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Deal Locking',
    description:
    "Deal locking ensures product availability by securing the transaction once the seller agrees to purchase.",
    icon: LockClosedIcon,
  },
  {
    name: 'Request to become a Seller.',
    description:
      'Initiate your journey as a seller by submitting a request to join our platform.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Get what you see.',
    description:
    "Receive exactly what you see with transparent and accurate product representations.",
    icon: FingerPrintIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
          <h2 className="text-base font-semibold leading-7" style={{ color: '#2461FF' }}>Buy Anything!</h2>

          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Over a wide range of products to buy.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Explore a diverse selection of products for every need and preference. 
          From electronics to fashion, find everything you desire in one convenient marketplace.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg " style={{backgroundColor: "#2461FF"}}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
