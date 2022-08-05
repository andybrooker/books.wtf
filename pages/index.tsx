import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { FunctionComponent } from 'react';
import bookCover from '../public/images/bookcover.webp'
import { styled } from '../stitches.config';

const Text = styled('p', {
  fontFamily: '$sans',
  fontWeight: 300,

  variants: {
    size: {
      1: {
        fontSize: '$1',
      },
      2: {
        fontSize: '$2',
      },
      3: {
        fontSize: '$3',
      },
    },
    color: {
      primary: {
        color: '$gray12'
      },
      secondary: {
        color: '$gray11'
      }
    }
  },
});

const Frame = styled('div', {

})

const Margins = styled(Frame, {
    margin: '0 auto',
    variants: {
      display: {
        mobile: {
          maxWidth: 'calc(100vw - 28px)',
          paddingTop: '14px'
        },
        desktop: {
          maxWidth: 'calc(100vw - 200px)',
          paddingTop: '100px'
        }
      }
    }
})



const NavFrame = styled('nav', {

})

const Span = styled('span', {
  fontFamily: '$sans',
  fontSize: '$2',
  fontWeight: 300,
})

const Body = styled(Frame, {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
})

const Header = styled('header', {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderBottom: '1px solid $gray6',
    variants: {
      display: {
        mobile: {
          flexDirection: 'column',
          gap: '7px'
        },
        desktop: {
          flexDirection: 'row'
        }
      }
    }
})

const Footer = styled('footer', {
  flexShrink: 0
})

const LinkStyle = styled('a', {
  fontFamily: '$sans',
  fontWeight: 300,
  fontSize: '$2',
  color: 'inherit',
})

type NavLinkProps = {
  href: string,
  name: string
}

const NavLink: FunctionComponent<NavLinkProps> = ({href, name}) => {
  return (
    <Link href={href} passHref>
      <LinkStyle>{name}</LinkStyle>
    </Link>
  )
}

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BOOKS</title>
        <meta name="description" content="A collection of past classics and a prediction of future classics." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <Frame css={{
          flex: '1 0 auto'
        }}>
                  <Header display={{
                    '@initial': 'desktop',
                    '@mobile': 'mobile'
                  }}>
                  <Frame><Span css={{
                    fontWeight: 500
                  }}>BOOKS</Span></Frame>
                  <NavFrame css ={{
                    display: 'flex',
                    gap: 20,
                  }}>
                    <NavLink href={'/'} name='Classic'/>
                    <NavLink href={'/'} name='Contemporary'/>
                  </NavFrame>
                  <Span css={{
                    color: '$gray9'
                  }}>Track Progress</Span>
                  </Header>
              <main>
              <Margins display={{
                '@initial': 'desktop',
                '@mobile': 'mobile'
              }}>
                <Grid>
                  <BookListing />
                  <BookListing />
                  <BookListing />
                  <BookListing />
                  <BookListing />
                  <BookListing />
                </Grid>
                
              </Margins>
                
              </main>
        </Frame>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Footer>
      </Body>
    </div>
  )
}

export default Home

const Grid = styled('div', {
  display: 'grid',
  gap: '28px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr));'
})

function BookListing() {
  return (<Frame>
    <Frame css={{
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      '& *': {
        flexGrow: 1
      },
      backgroundColor: '$sand3',
      '&:hover': {
        backgroundColor: '$sand4'
      }
    }}>
      <Frame css={{
        position: 'relative',
        height: '207px',
        '& span': {
          overflow: 'visible !important'
        },
        '& img': {
          boxShadow: '$medium',
          minWidth: 'fit-content !important'
        }
      }}>
      <Image src={bookCover}
      alt="Pride and Prejudice Book Cover"
      objectFit='contain' layout='fill'/>
      </Frame>

    </Frame>
    <Frame>
      <Text size="2" css={{
        marginBottom: 0,
      }}>
        Pride and Prejudice
      </Text>
    </Frame>
    <Frame>
      <Text size="1" color="secondary" css={{
        margin: 0,
        fontWeight: 300
      }}>
        Jane Austen
      </Text>
    </Frame>
  </Frame>)
}

