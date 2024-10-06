import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

//TODO: Ubah untuk bisa di pass in props dari FAQ Component
const FAQCard = () => {
  return (
    <div className="w-full ">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger><strong>Lorem ipsum dolor sit amet ?</strong></AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            quam possimus asperiores iste dolores sed ut quia, eveniet similique
            cumque tenetur, temporibus facilis aspernatur doloremque amet
            dignissimos, necessitatibus est non..
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQCard;
