import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SeoAccordion: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-10 py-10 sm:py-14 border-t border-[#f0f0f0]">
      <div className="max-w-4xl mx-auto text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-[#222] tracking-tight mb-4">
          Welcome To Jo Collections<br />
          <span className="text-base sm:text-lg font-normal text-[#666]">
            A Place Where Glamour and Traditions Meets.….
          </span>
        </h3>

        <p className="text-sm leading-relaxed text-[#555] mb-4">
          Hi from Jo Collections – your destination for fine ethnic wear. Headquartered in the vibrant metropolis of Hyderabad, we specialise in delivering the splendour of Indian culture through our thoughtful collections. Jo Collections- something that everybody wants, whether you are looking for a perfect saree to wear at a wedding, casual wear or just want an elegant piece of anything for the special occasion. We assure you of the best quality, distinctive designs, and unparalleled personalised shopping experience.
        </p>

        {/* Accordion Toggle */}
        <div className="border-t border-[#eee] pt-4">
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex items-center space-x-2 text-sm font-semibold text-[#222] hover:text-[#f372ac] transition-colors py-1 cursor-pointer"
          >
            <span>{isExpanded ? 'Read Less' : 'Read More...'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="mt-6 pt-4 border-t border-[#f5f5f5] space-y-6 text-sm text-[#555] leading-relaxed animate-fade-in">
              <div>
                <h4 className="text-base font-bold text-[#222] mb-2">Our Graceful Collection of Sarees</h4>
                <p>
                  At Jo Collections, in our opinion, sarees are the simple embodiment of elegance and culture worldwide that has survived time. Each saree in our collection tries to depict a story of traditional craftsmanship, but with a modern touch to finish it off. And here’s one of many varieties that we have:
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#222] mb-1">1. Traditional Sarees</h5>
                <p>
                  We’ll dress you to honour the traditional colours with our traditional Indian sarees. The traditional Indian sarees with ornamentation, from embroidery to zari work, to the richness of textures, make them perfect for those very special festivals, weddings, or cultural events. Choose from our traditional Chanderi, Kanjeevaram, or Banarasi sarees that bask in an air of timelessness with poise and elegance.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#222] mb-1">2. Sarees for Parties</h5>
                <p>
                  Our glittering party dress sarees can make everyone talk about them at a party. These sarees have been done by infusing intricate designs and sequins that are so dramatic. It is sure to make you a darling at any reception or evening event.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#222] mb-1">3. Casual Sarees</h5>
                <p>
                  Our casual sarees are the best for people who like style in its simplest form. These sarees are so well-suited for everyday use due to comfortable fabrics such as cotton, linen, and chiffon. Needless to say, they perfectly marry style, that’s why they are ideal for business, casual get-togethers, and leisure vacations.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#222] mb-1">4. Designer Sarees</h5>
                <p>
                  Our designer saree collection is, really, unique, so you can feel the essence of haute couture. Really very careful about details, and so, you get a masterpiece every time. Suits for people who want to add some elegance into their bolder style statement; these are perfect for them.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#222] mb-1">5. Silk Sarees</h5>
                <p>
                  Silk speaks for itself as far as elegance is concerned. We bring to you the rich textile heritage of India through our silk sarees. Our wardrobe essentials suitable for all special occasions are made up of luxury fabrics like Tussar, Mysore silk, and raw silk.
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0f0f0]">
                <h4 className="text-base font-bold text-[#222] mb-2">Experience the Jo Collections Difference.</h4>
                <p className="mb-3">
                  This is what Jo Collections wants: not just merchandise, but an experience that will make the customer remember the shopping. What makes us different is this:
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-[#222]">1. Quality that could not be compromised:</strong> We only work with the best for our clients. Be it checking each saree for quality or simply paying attention to the depth of fabric and accuracy of embroidery, we ensure it is of top quality and fulfils our high standards.
                  </li>
                  <li>
                    <strong className="text-[#222]">2. Unique style designs:</strong> We inject modernity with tradition in our design ethos altogether. We work with exceptionally talented designers and craftspeople to be able to provide you with classic yet fashionable sarees.
                  </li>
                  <li>
                    <strong className="text-[#222]">3. Fine workmanship:</strong> Every saree at Jo Collections is a remarkable piece of artistry. We are very close collaborators with artisans belonging to diverse regions to ensure that each piece reveals what best is in their special skills and techniques.
                  </li>
                  <li>
                    <strong className="text-[#222]">4. Personalised Buying Experience:</strong> Every customer has his/her choice, and we respect that. Our employees are committed to giving you a personalised shopping experience, including professional advice and styling recommendations.
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#f0f0f0]">
                <h4 className="text-base font-bold text-[#222] mb-2">Keep in Touch</h4>
                <p className="mb-2">Become part of the fashion community and get updated with all the latest trends as well as collections.</p>
                <p className="mb-1"><strong className="text-[#222]">Subscribe to Our Newsletter:</strong> For new arrivals, exclusive bargains, special deals, and much more, be the first to know.</p>
                <p><strong className="text-[#222]">See us on Social Networks:</strong> Find our behind-the-scenes collection photographs, what our clients have to say, and styling tips to leave you inspired.</p>
                <p className="mt-3 font-medium text-[#f372ac]">Let Jo Collections guide you in celebrating the special events of life so that you may stamp every occasion as noteworthy and memorable.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
