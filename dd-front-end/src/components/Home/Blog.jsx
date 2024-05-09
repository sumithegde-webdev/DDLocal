const posts = [
    {
      id: 1,
      title: 'DirectDealz: Empowering Sellers and Buyer',
      href: '#',
      description:
      'DirectDealz is your one-stop destination for seamless C2C transactions. Discover a wide range of products and services while enjoying a user-friendly platform',
      date: 'May 7, 2024',
      datetime: '2024-05-07',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Sumit Hegde',
        role: 'Co-Founder / CTO',
        href: '#',
       },
    },
    {
      id: 1,
      title: 'Enjoy a great experience.',
      href: '#',
      description:
      'With DirectDealz you can experience transparent transactions and effortless buying/selling. ',
      date: 'May 7, 2024',
      datetime: '2024-05-07',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Nikunj Khandelwal',
        role: 'Co-Founder / CTO',
        href: '#',
         },
    },
    {
      id: 1,
      title: 'Smooth transaction with seller',
      href: '#',
      description:
      "DirectDealz provided me with smooth transactions with the seller and it was an easy buying experience. I recommend it for hassle-free shopping!",
      date: 'May 8, 2024',
      datetime: '2024-05-08',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Nick Johans',
        role: 'Buyer',
        href: '#',
       },
    },
  ]
  
  export default function Blog() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reviews</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              See the buzz about Directdealz!
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  