import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { BsGithub, BsLinkedin, BsTelegram } from 'react-icons/bs';
import { Logo } from './logo';

export function Footerr() {
  const date: number = new Date().getFullYear();
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full px-4 md:px-8 lg:px-40">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <Logo className="mb-4 text-2xl md:text-4xl" />

          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="https://my-nextjs-portfolio-gamma-blush.vercel.app/">
                  Portfolio
                </FooterLink>
                <FooterLink href="https://github.com/NickNedilko">
                  Github
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow me" />
              <FooterLinkGroup col>
                <FooterLink href="www.linkedin.com/in/mykola-nedilko">
                  LinkedIn
                </FooterLink>
                <FooterLink href="https://t.me/NickyNed">Telegram</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="https://github.com/NickNedilko"
            by="All rights reserved. Developed by Mykola Nedilko"
            year={date}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsLinkedin} />
            <FooterIcon href="#" icon={BsTelegram} />
            <FooterIcon href="https://github.com/NickNedilko" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
