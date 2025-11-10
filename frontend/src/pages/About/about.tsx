export default function AboutUs() {
    return (
        <section className=" bg-white text-[var(--color-primary)]">
            <div
                className="md:pl-20 pl-4 sm:pt-[80px] pr-4 mx-auto px-0 grid md:grid-cols-[35%_65%] gap-0 items-center">
                <div className=" pt-8 sm:pt-0 font-bold text-2xl leading-8 tracking-[0.5%] pb-10">
                    <h2>About our dream.</h2>
                    <h2>Our History.</h2>
                    <h2>Cinema.</h2>
                </div>
                <div>
                    <h1 className="font-semibold text-[64px] md:text-6xl bl-16 pl-18 tracking-[-1%] leading-tight mb-4">
                        About Us
                    </h1>
                    <p className=" sm:pt-[32px] max-w-[832px] font-thin text-[16px] leading-[24px] tracking-[0.5%] align-middle">
                        Welcome to Cinebh, where movie magic comes to life. <br/>
                        At Cinebh, we're not just about screening films; we're passionate about creating unforgettable
                        cinematic experiences.
                        Since our establishment, we've been dedicated to providing our audience with top-quality
                        entertainment in a comfortable and welcoming environment.
                        <br/>
                        Our state-of-the-art facilities boast the latest in audiovisual technology,
                        ensuring that every movie is presented with stunning clarity and immersive sound.
                        From the latest blockbusters to timeless classics, our diverse selection of films
                        caters to every taste and preference.<br/>
                        <p>
                            <br/>As a hub for community entertainment, we take pride in being more than just a
                            cinema.<br/>
                            Join us at Cinebh and discover why we're not just your average movie theater —
                            we're your destination for cinematic excellence and entertainment bliss.
                        </p>
                    </p>
                </div>
            </div>
            <div className="mt-10 pb-17 md:pb-0">
                <img src="/assets/images/about_us_photo_of_seats.jpg"
                     alt="Cinema seats"
                     className="w-full object-cover "/>
            </div>
        </section>
    );
}

