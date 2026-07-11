import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { MotionDiv, MotionScroll } from "@/components/MotionWrapper";

// Server Component fetching the Room Types
export default async function Home() {
  let roomTypes = [];
  try {
    const res = await fetchAPI("/hotel/room-types");
    roomTypes = res?.items || [];
  } catch (error) {
    console.error("Failed to fetch room types:", error);
    // Fallback data if backend is down
    roomTypes = [
      {
        id: 1,
        name: "Serenity Suite",
        description: "A spacious open-plan suite featuring a private balcony overlooking the botanical gardens and a deep soaking tub.",
        price_per_night: 550,
        capacity: 2,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8jPXqxZAvGTi4ocA7zdkvdwYtk-f3Jj0_PX738VdW0iCURYUXWgWDjsNkyXCgECASD9QjZliIKgdElsz8HU3gC7VGKvefonZMQZ2OEI120oyrzEtKdjqHlb9P9oHiDbBLV_BLiSM3nT7cIRcpXYnHXylv9ocXEhMAtMsSRv9C37yspLkLAJlnkmUdyc-S79vY6-dq6FrnOJwJLbCC1yrPGF2Yo8z5LT5IdMvn8buxCMVWnC_oDIWJhA"
      },
      {
        id: 2,
        name: "Azure Villa",
        description: "Complete privacy with an infinity plunge pool, dedicated butler service, and direct access to the secluded beach.",
        price_per_night: 950,
        capacity: 4,
        image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_98TOr9nB914XPQ9pLa3gNlQczK5SF47o7sL0ELB4fFg_wmqIMCgn11199E6yTPMftQLIcbmJhViYr2T1Kv2GD5AdqQ1wMuXI4PmZ__4W7R5waz22JK8vWRGolzIvxZYcjXToAaTU0I8aBhMlmfhuSJIStaEQxM1eq4DUg1T792gy-dSfPBEMknm_uGKXgGGEdL1Zdf1pSQ2fYMnrWfsdqYrDCWd1CNPdnqwv3p1xHTG5s0KXBPnhmQ"
      },
    ];
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0Y4F3QfuXi_kImYAzK0oqswQmkWSUGOLiPTUw5OrEteKyNGvhujmzJp3aN87xtGerT-Z3rTu03-SumBIiebe8bYCelrTFA9fT20sJlb-0q9HqjfKe0Mjc2Ad8AkU_KpPxfFN3JwSJkLrlfsievcJt9YMbs9SyWK-3zOH76Tt2v0Ad89_B9fH1Wg_Sb9AXtM_rvUwZ2jNHJgB0luA9dNiNJYlUX_2rvtn3TcETAZXgOIhsiyJGUAOHw')" }}
        ></div>
        
        {/* Gradient Overlay for legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-background"></div>
        
        {/* Booking Widget */}
        <MotionDiv delay={0.2} className="relative z-20 w-full max-w-[900px] mx-5 md:mx-auto glass-effect rounded-lg ambient-shadow p-6 md:p-10 mt-auto mb-16">
          <h1 className="font-serif text-3xl text-primary mb-6 text-center">Find Your Sanctuary</h1>
          <form className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Check-in</label>
              <div className="relative">
                <input 
                  className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0" 
                  type="date"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Check-out</label>
              <div className="relative">
                <input 
                  className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0" 
                  type="date"
                />
              </div>
            </div>
            <div className="w-full md:w-32">
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Guests</label>
              <div className="relative">
                <select className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0 appearance-none">
                  <option className="bg-background text-foreground">1</option>
                  <option className="bg-background text-foreground">2</option>
                  <option className="bg-background text-foreground">3</option>
                  <option className="bg-background text-foreground">4+</option>
                </select>
              </div>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.1em] rounded hover:opacity-90 transition-opacity" type="button">
              Search &rarr;
            </button>
          </form>
        </MotionDiv>
      </section>

      {/* Room Showcase: Sanctuaries */}
      <section id="rooms" className="py-24 px-5 md:px-16 max-w-7xl mx-auto">
        <MotionScroll className="mb-16 md:w-1/2">
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4 tracking-tight">Sanctuaries</h2>
          <p className="font-sans text-lg text-secondary">
            Designed for quiet contemplation and restorative sleep, our spaces blend natural textures with understated luxury.
          </p>
        </MotionScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomTypes.map((rt: any, idx: number) => (
            <MotionScroll key={rt.id} delay={idx * 0.1}>
              <Link href={`/rooms/${rt.id}`} className={`group block cursor-pointer ${idx % 2 === 1 ? 'md:mt-12' : ''}`}>
                <div className="relative h-80 md:h-[400px] mb-6 overflow-hidden rounded-lg">
                  <img 
                    alt={rt.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    src={rt.image_url || "https://images.unsplash.com/photo-1542314831-c53cd4532862"}
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">{rt.name}</h3>
                  <span className="font-sans text-base text-secondary">From ${rt.price_per_night}/nt</span>
                </div>
                <p className="font-sans text-base text-secondary mb-4 line-clamp-2">{rt.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-[0.1em] rounded-full">Sleeps {rt.capacity}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary border-b border-primary pb-1 group-hover:opacity-80">
                  View Details &rarr;
                </div>
              </Link>
            </MotionScroll>
          ))}
        </div>
      </section>

      {/* Spa Rituals & Wellness */}
      <section id="amenities" className="py-24 px-5 md:px-16 max-w-7xl mx-auto">
        <MotionScroll className="mb-16 md:w-1/2">
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4 tracking-tight">Spa Rituals & Wellness</h2>
          <p className="font-sans text-lg text-secondary">
            Experience a holistic journey of rejuvenation where ancient wisdom meets modern science in our curated wellness rituals.
          </p>
        </MotionScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Lumina Signature Massage", 
              desc: "A 90-minute restorative hot stone therapy designed to release deep-seated tension and restore energetic balance.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU9LSzrZEiClM_T_yo9-DyrPhiilEBh8eECxCS0GV9KE4oEu_DBHs5v-SScglR9guCLUCnTD3rwOV5JD0xjg78g76xNYl2xWtlfJpb-gjWaO8qskS0KCupsgdB6Nri0QMXYJNlP6YTRt3-qpyQaZMi3ndvXfhTqH59yTAohsZ0_PPfCYMGVRwqnfaiFHE0d1GZGbDKItUgzyTgSQj1pextkyjhXuu2D-vFI8zU9uUu6qcWHDj4AMw4LA"
            },
            { 
              title: "Botanical Glow Ritual", 
              desc: "An exfoliating sea salt scrub followed by a nourishing essential oil wrap to revitalize the skin and soothe the senses.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWBupmN8NLyanQ2TIfgRgqURuVYEiehPtGrgokuzOouWzHJbVUVY2ciJCQdqf_yT-aYmaxNb45JsOobfkqL0tDI4h_9xb8rj8uR8WsnN2RzaeX-He1KIPQtFWOwqocPBfUNQ8h6d5S44j0hPoxyb660GxG8acAjSXF8ZsQzjwnUrgYmcPNliI2_N-1G4jupn8Rqvm5ZmE9tX0-YQP9I2MtOgJ8k_Sb4ad-wx1fpoTe1YTr9R00Q8duEA"
            },
            { 
              title: "Zen Morning Yoga", 
              desc: "A private sunrise session in our garden studio, focusing on breathwork and gentle flow to start your day with clarity.",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZTRX-0T-fvEuHEueZETF4iueS4SPC5hJwLz1ZiUnRCX0keyqsmLVsqyxja1OLwLE7se8p8w5mhAhMyRubOWWkv4cD7fiZeCJfK5PmkRYato3DU6x3Fb_fyc2RawnX4YFWopiQ-9BHigoGdSKhY8wpyIKD3zE8Z32SRz3ohTrBe4iYjLr4--y50Z1_psENoofN8RPT5b4RtxNyV76Yf0ychT-PeCRoNZbDcFLcA5n5pWwQQzh6zczPkA"
            }
          ].map((ritual, idx) => (
            <MotionScroll key={idx} delay={idx * 0.1}>
              <div className={`group cursor-pointer ${idx === 1 ? 'md:mt-12' : ''}`}>
                <div className="relative h-80 md:h-[400px] mb-6 overflow-hidden rounded-lg">
                  <img alt={ritual.title} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" src={ritual.img}/>
                </div>
                <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors mb-2">{ritual.title}</h3>
                <p className="font-sans text-base text-secondary mb-6 line-clamp-2">{ritual.desc}</p>
              </div>
            </MotionScroll>
          ))}
        </div>
      </section>

      {/* Dining Section */}
      <section id="dining" className="py-24 px-5 md:px-16 max-w-7xl mx-auto border-t border-border/20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <MotionScroll className="w-full md:w-1/2">
            <h2 className="font-serif text-4xl md:text-6xl text-primary mb-6 tracking-tight">Culinary Excellence</h2>
            <p className="font-sans text-lg text-secondary mb-6">
              Savor farm-to-table gastronomy at our signature restaurant, <span className="font-serif italic text-foreground">Aura</span>. 
              Our executive chefs craft seasonal menus inspired by local traditions and global innovation, 
              served in an atmosphere of effortless elegance.
            </p>
          </MotionScroll>
          <MotionScroll className="w-full md:w-1/2" delay={0.2}>
            <div className="relative h-80 md:h-[500px] w-full overflow-hidden rounded-lg ambient-shadow">
              <img 
                alt="Aura Restaurant" 
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out" 
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
              />
            </div>
          </MotionScroll>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-5 md:px-16 max-w-7xl mx-auto border-t border-border/20">
        <MotionScroll className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4 tracking-tight">The Lumina Experience</h2>
          <p className="font-sans text-lg text-secondary max-w-2xl mx-auto">
            Glimpses of modern serenity and architectural brilliance.
          </p>
        </MotionScroll>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MotionScroll delay={0.1} className="col-span-2 md:col-span-2 row-span-2">
            <div className="relative h-64 md:h-full w-full overflow-hidden rounded-lg group">
              <img alt="Pool" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-serif text-xl tracking-wide">Infinity Pool</span>
              </div>
            </div>
          </MotionScroll>
          <MotionScroll delay={0.2} className="col-span-1">
            <div className="relative h-40 md:h-64 w-full overflow-hidden rounded-lg group">
              <img alt="Lounge" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop" />
            </div>
          </MotionScroll>
          <MotionScroll delay={0.3} className="col-span-1">
            <div className="relative h-40 md:h-64 w-full overflow-hidden rounded-lg group">
              <img alt="Lobby" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" />
            </div>
          </MotionScroll>
          <MotionScroll delay={0.4} className="col-span-2">
            <div className="relative h-40 md:h-64 w-full overflow-hidden rounded-lg group">
              <img alt="Exterior" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=2064&auto=format&fit=crop" />
            </div>
          </MotionScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-5 md:px-16 max-w-7xl mx-auto border-t border-border/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <MotionScroll>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 tracking-tight">Connect With Us</h2>
            <p className="font-sans text-lg text-secondary mb-10">
              Whether you are planning your escape or have a request for your upcoming stay, our concierge is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground mb-1">Address</h4>
                <p className="font-sans text-secondary">1 Serenity Way, Coastal Haven, CA 90210</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground mb-1">Reservations</h4>
                <p className="font-sans text-secondary">+1 (800) 555-0199 <br/> reservations@luminaspa.com</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground mb-1">Concierge</h4>
                <p className="font-sans text-secondary">+1 (800) 555-0198 <br/> concierge@luminaspa.com</p>
              </div>
            </div>
          </MotionScroll>
          
          <MotionScroll delay={0.2} className="glass-effect rounded-lg p-8 ambient-shadow border border-border/30">
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Name</label>
                <input className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0" type="text" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Email</label>
                <input className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0" type="email" placeholder="Your email address" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-secondary mb-2">Message</label>
                <textarea className="input-subtle w-full py-2 font-sans text-base text-foreground bg-transparent focus:ring-0 resize-none h-24" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full px-8 py-4 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.1em] rounded hover:opacity-90 transition-opacity mt-4" type="button">
                Send Message
              </button>
            </form>
          </MotionScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted dark:bg-card border-t border-border/30 w-full pt-24 pb-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-16 max-w-7xl mx-auto">
          <div className="md:col-span-1 mb-8 md:mb-0">
            <span className="font-serif text-3xl text-primary mb-4 block">Lumina</span>
            <p className="font-sans text-base text-secondary">A Sanctuary of Modern Serenity.</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <a className="font-sans text-base text-foreground hover:text-primary transition-opacity duration-200 opacity-80 hover:opacity-100" href="#">Spa Rituals</a>
              <a className="font-sans text-base text-foreground hover:text-primary transition-opacity duration-200 opacity-80 hover:opacity-100" href="#">Suites & Villas</a>
            </div>
            <div className="flex flex-col space-y-4">
              <a className="font-sans text-base text-foreground hover:text-primary transition-opacity duration-200 opacity-80 hover:opacity-100" href="#">Wellness Programs</a>
            </div>
            <div className="flex flex-col space-y-4">
              <Link className="font-sans text-base text-foreground hover:text-primary transition-opacity duration-200 opacity-80 hover:opacity-100" href="/privacy">Privacy Policy</Link>
              <a className="font-sans text-base text-foreground hover:text-primary transition-opacity duration-200 opacity-80 hover:opacity-100" href="#">Sustainability</a>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-16 max-w-7xl mx-auto mt-16 pt-8 border-t border-border/20">
          <p className="font-sans text-base text-secondary text-sm">© {new Date().getFullYear()} Lumina Spa & Resort. A Sanctuary of Modern Serenity.</p>
        </div>
      </footer>
    </main>
  );
}
