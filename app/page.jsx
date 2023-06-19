import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & share
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI–Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            PrompTopia is a place to Create, Store, Share, and Discover amazing AI prompts
        </p>

        <Feed />
        {/* Feed Component */}
    </section>
  )
}

export default Home