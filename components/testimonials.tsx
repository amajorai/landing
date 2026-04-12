import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-32" id="testimonials">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="font-medium text-4xl lg:text-5xl">
            trusted by innovative companies
          </h2>
          <p>
            Our clients consistently praise our ability to deliver high-quality
            software solutions on time and within budget. Here&apos;s what they
            have to say about working with Base 7.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] gap-8 rounded-[1rem] border-none bg-muted shadow-none sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader />
            <CardContent>
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="font-medium text-xl">
                  Base 7 transformed our business with their local-first
                  approach to software development. Their team delivered our
                  application in just 18 days, exceeding all expectations. The
                  solution they built is not only incredibly fast but also works
                  seamlessly offline, which has been a game-changer for our
                  field operations. Their technical expertise and commitment to
                  quality are unmatched.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="font-medium text-sm">Michael Chen</cite>
                    <span className="block text-muted-foreground text-sm">
                      CTO, TechVision
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="rounded-[1rem] border-none bg-muted shadow-none md:col-span-2">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="font-medium text-xl">
                  Working with Base 7 was refreshingly straightforward. They
                  took our complex requirements and delivered an elegant
                  solution that our users love. Their 24/7 support has been
                  exceptional, and the team&apos;s technical knowledge is
                  impressive.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="font-medium text-sm">Sarah Johnson</cite>
                    <span className="block text-muted-foreground text-sm">
                      Product Manager, FinEdge
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="rounded-[1rem] border-none bg-muted shadow-none">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Base 7&apos;s consulting services helped us navigate a complex
                  digital transformation. Their strategic insights and technical
                  expertise were invaluable to our success.
                </p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarFallback>DT</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="font-medium text-sm">David Tan</cite>
                    <span className="block text-muted-foreground text-sm">
                      CEO, SingaTech
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
          <Card className="rounded-[1rem] border-none bg-muted shadow-none">
            <CardContent className="h-full pt-6">
              <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  The edge-optimized application Base 7 built for us has
                  revolutionized how we serve our customers. Fast, reliable, and
                  incredibly intuitive. Worth every penny.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Priya Sharma</p>
                    <span className="block text-muted-foreground text-sm">
                      Director of Innovation, GlobalRetail
                    </span>
                  </div>
                </div>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
