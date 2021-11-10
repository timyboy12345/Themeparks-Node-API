import internal from 'stream';

export interface AttraktionerResponseInterface {
  'componentChunkName': string,
  'path': string,
  'result': {
    'data': {
      'contentfulContentPage': {
        'contentful_id': '2MvvEpZTYqFADrdN15WRbz',
        'id': 'aa772370-9017-5821-8d3a-4bd35412c87b',
        'node_locale': 'sv',
        'pageTheme': null,
        'title': 'Attraktioner',
        'slug': '/attraktioner',
        'description': 'Upplev Gröna Lunds fantastiska attraktioner! ✓ Snurriga karuseller ✓ Häftiga berg- och dalbanor ✓ Galna G-krafter!',
        'keywords': null,
        'socialMediaSharedImage': {
          'file': {
            'url': '//images.ctfassets.net/ds6dz7ilx8up/6clGukABDcZ0w5jPLuGlqA/d4e50ff291cf47117463bedd4507e096/attraktion-jetline-social-media-image.jpg'
          }
        },
        'metaTitle': 'Attraktioner på Gröna Lund',
        'excludePageFromExternalSearch': null,
        'excludePageFromInternalSearch': null,
        'excludePageFromSiteBuild': null,
        'blocks': [
          {
            '__typename': 'ContentfulHeroBlock',
            'contentful_id': '70c4ox6EjqIJBCUZXeeJ00',
            'id': '3eafa4fa-6f3d-517d-bab3-cbfc00fad719',
            'entryTitle': null, 'heroParagraph': null,
            'buttonLabel': null, 'textPositioning': null,
            'enableTextBackground': false,
            'componentTheme': 'blue',
            'buttonLink': null, 'heroImageSmallDevice': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/6ip9AvSYBqFrpBA0AfrS0f/36ae3b5ce50207417b0b1c100b6c48be/attraktioner-hero-backgroundvideo-mobil.jpg' } }, 'heroImageLargeDevice': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/5Bs4HgOsVfEGqypcVT1P72/688e9903225e2f922b53ecdc40b84a97/attraktioner-hero-backgroundvideo-desktop.jpg' } }, 'backgroundVideo': { 'file': { 'url': '//videos.ctfassets.net/ds6dz7ilx8up/2s0k02ueulSxqzVmbUE52V/84dcbc5e8a31ba481007cc25dff70adc/1920x1080_header_attraktioner.mp4' } }, 'backgroundVideoMobile': { 'file': { 'url': '//videos.ctfassets.net/ds6dz7ilx8up/2s0k02ueulSxqzVmbUE52V/84dcbc5e8a31ba481007cc25dff70adc/1920x1080_header_attraktioner.mp4' } }
          }, {
            '__typename': 'ContentfulBackgroundWrapperBlock',
            'contentful_id': '4mQsGddiKiXKWGfooydnmE',
            'id': 'ec31416f-e790-5906-847d-5288004dfcc4',
            'background': 'bullseye',
            'enableTopPattern': null,
            'blocks': [{
              '__typename': 'ContentfulListBlock',
              'contentful_id': '1kyTaugvxeyRFu4bUdWVrC',
              'id': 'b03a84f8-7133-5e93-a1b9-15847d978db1',
              'title': 'Attraktioner',
              'filterAllLabel': null,
              'isShowList': null,
              'disableDateSortingForShowList': null,
              'enableFilter': true,
              'filterHeadline': 'Filtrera på typ av attraktion',
              'showLengthFilter': true,
              'lengthFilterHeadline': 'Filtrera på längd',
              'componentTheme': null,
              'borderPattern': null,
              'filters': Filter[],
              'lists': {
                'id': 'c4497052-5649-5e93-8818-372bf895f4ff',
                'headline': null,
                'ingress': null,
                'isCarousel': boolean,
                'isCarouselMobile': boolean,
                'listObjects': ContentfulRideBlock[]
              }[],
              'preamble': null,
              'primaryButtonLink': null,
              'secondaryButtonLink': null,
              'displayRestaurantWaitingOrders': null,
              'showSortingOption': null
            }]
          }, {
            '__typename': 'ContentfulCardListItemBlock',
            'contentful_id': 'UmlvddBb31LssHA6YWR84',
            'id': '8f2aa722-2c22-5e7f-8aa0-4e4421a60200',
            'title': 'Attraktionsfoto',
            'componentTheme': null,
            'borderPattern': null,
            'alignRight': null,
            'useParallax': null,
            'link': {
              'slug': '/attraktionsfoto'
            },
            'linkExternalUrl': null,
            'assetLink': null,
            'buttonLabel': 'Hämta här',
            'cardDescription': {
              'cardDescription': 'Spara minnet av åket för evigt! Här kan du hämta ditt attraktionsfoto online. '
            },
            'topSectionText': null,
            'topSectionImage': null,
            'image': null,
            'backgroundImage': {
              'file': {
                'url': '//images.ctfassets.net/ds6dz7ilx8up/5oFNg8Z7IDh2Ubu05RQgi1/3c7673d15e67d49d165a17bfe1d2ac71/full-widht-card-vilda-musen-attraktionsfoto.jpg'
              }
            },
            'backgroundImageSmallDevice': null
          }]
      },
      'contentfulEcommerceConfig': {
        'jetshopCurrency': 'sek',
        'jetshopCulture': 'sv',
        'currencyDisplayName': 'kr',
        'cartLabel': 'Din varukorg',
        'cartSummeryLabel': 'Summa',
        'cartArticleLabel': 'vara',
        'cartArticlesLabel': 'varor',
        'cartIsEmptyLabel': 'är tom',
        'addToCartLabel': 'Lägg till',
        'addReactivateCardToCartLabel': 'Lägg till',
        'addedToCartLabel': 'Tillagd',
        'removeFromCartLabel': 'Ta bort',
        'continueLabel': 'Fortsätt',
        'continueShoppingLabel': 'Fortsätt handla',
        'chooseAmountLabel': 'Välj antal',
        'cancelLabel': 'Avbryt',
        'cardNumberInputLabel': 'Nuvarande kortnummer',
        'cardNumberInputHelpText': 'Ange kortnumret på det kort du vill återaktivera',
        'emailInputLabel': 'Din e-postadress',
        'emailInputHelpText': 'Ange den e-postadress som är registrerad på kortet',
        'admissionAddToCartLabel': 'Köpa',
        'bookShowAddToCartLabel': 'Boka plats',
        'bookShowOutOfStock': 'Fullbokad',
        'defaultAddToCartNotificationHeadline': 'Wohoo!',
        'defaultAddToCartNotificationBody': '%productName% är tillagd i varukorgen.',
        'upsellPage': null,
        'jetshopCheckoutUrl': {
          'externalUrl': 'https://webbshop.gronalund.com/externalcheckout.aspx',
          'title': 'Till kassan'
        },
        'jetshopErrorMessages': {
          'list': Label
        }
      },
      'contentfulSiteConfiguration': {
        'primary': true,
        'node_locale': 'sv',
        'siteTheme': 'gronalund',
        'defaultSiteNavigation': {
          '__typename': 'ContentfulMainNavigation',
          'id': 'a71b91f0-e046-58b3-a5a5-eb922ed35cfd',
          'menuIconTitle': 'Meny',
          'linkGroups': [
            {
              'id': 'b9c362f0-fc43-5d31-ab92-3cb93cdb7be0',
              'headline': 'Planera din dag',
              'secondary': null,
              'listObjects': ContentFulLink[]
            },
            {
              'id': 'ffeb2938-adfa-5ffe-95e1-43e1e3865548',
              'headline': 'Specialevent',
              'secondary': null,
              'listObjects': ContentFulLink[]
            },
            {
              'id': 'b86a5196-338b-5212-a1e9-7236cd2f7f9e',
              'headline': 'Upptäck parken',
              'secondary': null,
              'listObjects': ContentFulLink[]
            },
            {
              'id': 'c853b8f4-a3f7-52a8-a66c-3e8528da36e0',
              'headline': 'Företag & grupper',
              'secondary': null,
              'listObjects': ContentFulLink[]
            },
            {
              'id': '762023cd-9b0c-5ef5-ba2f-82fda981793e',
              'headline': 'Mer',
              'secondary': true,
              'listObjects': ContentFulLink[]
            }],
          'logoTransparent': { 'internalLink': { 'slug': '/' } },
          'logoFilled': { 'internalLink': { 'slug': '/' } },
          'searchPlaceholderLabel': 'Vad vill du söka på?',
          'searchResultHeader': 'Resultat',
          'searchNoResultText': 'Inga resultat',
          'languageSelectionList': {
            'languages': [{
              'url': '/',
              'title': 'Svenska',
              'locale': 'sv'
            },
              {
                'url': '/en',
                'title': 'English',
                'locale': 'en'
              }]
          }
        },
        'facebookFallbackImage': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/2Lv4ATlfrPTBrKoH3JyAaV/beeac595fcb03faf12d81f09474eb2da/Gronalund-vy1080x720.jpg' } },
        'footerLogo': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/XbI2on2RsCvDZYGJ0POYV/c7398c0165c1929a7821f4287787542b/grona-lund-logo.svg' } },
        'footerLinks': Link[],
        'additionalFooterLinks': Link[],
        'footerPhoneNumber': null,
        'footerAddress': 'Lilla Allmänna Gränd 9, 115 21 Stockholm',
        'footerAddressLink': { 'slug': '/hitta-hit' },
        'footerEmail': null,
        'footerSocialMediaTitle': 'Följ oss i sociala medier',
        'footerSocialMediaLinks': [
          {
            'contentful_id': '1TyXZ73Vvj79MjOGO6Q90Z',
            'id': 'b90d4e68-0587-5209-9719-53ed96e0e067',
            'title': 'Youtube',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://www.youtube.com/user/gronalundstivoli',
            'openInNewTab': null,
            'image': null,
            'asset': null,
            'linkIcon': 'icon-youtube',
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          },
          {
            'contentful_id': '2PYwPdYvKUClbxpguExYLi',
            'id': '052044b9-4fc2-5ebc-8924-fd0fdbec536a',
            'title': 'Facebook',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://www.facebook.com/gronalundstivoli/',
            'openInNewTab': null,
            'image': null,
            'asset': null,
            'linkIcon': 'icon-facebook',
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          },
          {
            'contentful_id': '5Uj8VUMWoLR3SNhFvklFWv',
            'id': '0a024a5f-9649-56de-8d34-2443adf380fe',
            'title': 'Instagram',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://www.instagram.com/gronalund/',
            'openInNewTab': null,
            'image': null,
            'asset': null,
            'linkIcon': 'icon-instagram',
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          }],
        'footerParksAndResortsLink': {
          'contentful_id': '4v2V8YTUML3TBEPsy5VFTg',
          'id': 'd6dabdd1-7955-5f9a-bec2-dd057b208c4e',
          'title': 'Parks & Resorts',
          'smallDeviceTitle': null,
          'internalLink': null,
          'externalUrl': 'https://parksandresorts.com',
          'openInNewTab': true,
          'image': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/5LZe8u9WOigmEB8v7hj79H/14fd8c21cbc0ae6066d49b9a15cb0b2d/prs-logo-white.svg' } },
          'asset': null,
          'linkIcon': null,
          'scrollToBlockTitle': null,
          'scrollToBlock': null
        },
        'footerParksLinks': [
          {
            'contentful_id': '5ix24DAl3wKK5JUriPgzdi',
            'id': 'bce66ee7-9296-59a4-8134-82b71dcbf370',
            'title': 'Kolmården',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://www.kolmarden.com',
            'openInNewTab': null,
            'image': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/2tJY6HlaVQbEYVBXW8jXti/6de5f09e03c342ddfb86a13a5b65032a/kolmarden-logo.svg' } },
            'asset': null,
            'linkIcon': null,
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          },
          {
            'contentful_id': '3T0EP4APhX1YN14cYmtNU1',
            'id': '8d5cde4d-ffcd-5938-ac6c-f2f02b8f93bf',
            'title': 'Gröna Lund',
            'smallDeviceTitle': null,
            'internalLink': { 'slug': '/' },
            'externalUrl': null,
            'openInNewTab': null,
            'image': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/XbI2on2RsCvDZYGJ0POYV/c7398c0165c1929a7821f4287787542b/grona-lund-logo.svg' } },
            'asset': null,
            'linkIcon': null,
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          },
          {
            'contentful_id': '7aKYzaQ3kto3m7FVMkwLXj',
            'id': 'f2a47b9a-d8c8-5295-9265-3795f5404d9f',
            'title': 'Furuvik',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://furuvik.se',
            'openInNewTab': true,
            'image': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/78My3M6ifkmayDnZDH5XwM/d96766841a56e6bc9d454d3082b8b884/furuvik-logo.svg' } },
            'asset': null,
            'linkIcon': null,
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          },
          {
            'contentful_id': '5WrfW4bs5jMsn3AGwxIFuH',
            'id': 'a95f4b1e-a88b-5e13-a088-231a5caeb998',
            'title': 'Skara Sommarland',
            'smallDeviceTitle': null,
            'internalLink': null,
            'externalUrl': 'https://www.sommarland.se',
            'openInNewTab': true,
            'image': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/2cfGfrjbqbgOnAkVCsQxcH/a24abd4d17418eaff5137c471a6c228c/skara-logo.svg' } },
            'asset': null,
            'linkIcon': null,
            'scrollToBlockTitle': null,
            'scrollToBlock': null
          }],
        'siteLabels': {
          'list': Label[]
        },
        'broadcastMessageStatus': 'Hide',
        'broadcastMessageContent': { 'childMarkdownRemark': { 'html': '<p>Parken har öppet omsorgsfullt för ett begränsat antal gäster. Läs mer här.</p>' } },
        'broadcastMessageLink': null,
        'cookieMessageText': { 'childMarkdownRemark': { 'html': '<p>Vi använder sockervadd för att förbättra din upplevelse i vår park och cookies för att förbättra din upplevelse på vår webbsida. 🍪 Läs mer om hur vi behandlar dina personuppgifter <a href="https://parksandresorts.com/integritetspolicy/" title="Parks and Resorts Integritetspolicy">här</a>.</p>' } },
        'cookieMessageBtnLabel': 'Jag förstår 👌',
        'enableLogin': true,
        'enableMyPages': true,
        'enableChatbot': true,
        'enableJetPassExplanation': false
      },
      'allContentfulEntryProductTemplateBlock': {
        'edges': [
          {
            'node': {
              'id': 'ed5bd6ac-3bdb-54f5-80ca-a428be6422cc',
              'node_locale': 'sv',
              'internalTitle': 'Entry Product Template Block GraphQL (Do not remove)',
              'templateId': -1,
              'templateImage': { 'file': { 'url': '//images.ctfassets.net/ds6dz7ilx8up/1Di0OjHZPSPQAmJYvK8eiO/717def376977e8597a21d16f9197195b/star-emoji.png' } },
              'templateDescription': { 'templateDescription': 'stub' }
            }
          },
          {
            'node': {
              'id': '93552f55-6051-5728-a0a1-269a1fdb62f7',
              'node_locale': 'en',
              'internalTitle': 'Entry Product Template Block GraphQL (Do not remove)',
              'templateId': -1,
              'templateImage': { 'file': null },
              'templateDescription': { 'templateDescription': 'stub' }
            }
          }
        ]
      }
    },
    'pageContext': {
      'slug': '/attraktioner',
      'node_locale': 'sv',
      'pageTheme': null,
      'excludePageFromExternalSearch': null,
      'excludePageFromInternalSearch': null
    }
  },
  'staticQueryHashes': string[]
}

export interface Filter {
  'id': string,
  'title': string
}

export interface Label {
  'key': string,
  'value': string
}

export interface Tag {
  'title': string
}

export interface Link {
  'id': '7748e4f1-f787-54bb-9495-529279f2adb1',
  'title': 'Om Gröna Lund',
  'slug': '/om-grona-lund'
}

export interface ContentFulLink {
  '__typename': 'ContentfulLink',
  'id': string,
  'title': string,
  'internalLink': { 'slug': string },
  'externalUrl': null
}

export interface ContentfulRideBlock {
  '__typename': 'ContentfulRideBlock',
  'contentful_id': string,
  'id': string,
  'sortIndex': number,
  'title': string,
  'rideId': number,
  'borderPattern': 'darkGreenStripes' | 'lightBlueStripes' | 'purpleJagged' | 'orangeStripes' | 'orangeJagged' | 'redStripes' | 'redJagged',
  'componentTheme'?: 'blue' | 'purple' | 'red' | 'orange',
  'couponCount': string,
  'couponText'?: 'Ingår i Ticket to Ride',
  'minimumHeight': string,
  'minimumHeightInteger': number,
  'noHeightRequirement': boolean,
  'ageRequirement'?: string,
  'separateTickets'?: boolean,
  'preamble': {
    'preamble': string
  },
  'description': null,
  'shortDescriptionInList': null,
  'imageInList': {
    'file': {
      'url': string
    }
  },
  'label': 'Jetpass-attraktion!',
  'pageLink': {
    'slug': string
  },
  'tags': Tag[],
  'mapLink': null
}
