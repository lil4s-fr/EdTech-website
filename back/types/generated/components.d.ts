import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsAccordionElement extends Struct.ComponentSchema {
  collectionName: 'components_elements_accordion_elements';
  info: {
    displayName: 'AccordionElement';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_buttons';
  info: {
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    IsExternal: Schema.Attribute.Boolean;
    Label: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    Type: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'white']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
    URL: Schema.Attribute.String;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'Card';
    icon: 'command';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsHighlightCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_highlight_cards';
  info: {
    displayName: 'HighlightCard';
    icon: 'crown';
  };
  attributes: {
    AltText: Schema.Attribute.String;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link: Schema.Attribute.String;
  };
}

export interface ElementsInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_info_cards';
  info: {
    displayName: 'InfoCard';
    icon: 'collapse';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Link: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsMembershipPlan extends Struct.ComponentSchema {
  collectionName: 'components_elements_membership_plans';
  info: {
    displayName: 'MembershipPlan';
    icon: 'manyToMany';
  };
  attributes: {
    ButtonLabel: Schema.Attribute.String;
    ButtonLink: Schema.Attribute.String;
    Price: Schema.Attribute.String;
    Subtitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface ElementsMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_menu_items';
  info: {
    displayName: 'Menu Item';
    icon: 'bulletList';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface ElementsMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_menu_links';
  info: {
    displayName: 'Menu Link';
    icon: 'cursor';
  };
  attributes: {};
}

export interface ElementsPartner extends Struct.ComponentSchema {
  collectionName: 'components_elements_partners';
  info: {
    displayName: 'Partner';
    icon: 'briefcase';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
  };
}

export interface ElementsSocials extends Struct.ComponentSchema {
  collectionName: 'components_elements_socials';
  info: {
    displayName: 'Socials';
    icon: 'alien';
  };
  attributes: {
    Link: Schema.Attribute.String;
    Platform: Schema.Attribute.Enumeration<['X', 'LinkedIn', 'Facebook']>;
  };
}

export interface SectionsAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'grid';
  };
  attributes: {
    AccordionElements: Schema.Attribute.Component<
      'elements.accordion-element',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsActions extends Struct.ComponentSchema {
  collectionName: 'components_sections_actions';
  info: {
    displayName: 'Actions';
    icon: 'arrowUp';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'elements.info-card', true>;
    SectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsCallToAction extends Struct.ComponentSchema {
  collectionName: 'components_sections_call_to_actions';
  info: {
    displayName: 'CallToAction';
  };
  attributes: {
    Alignment: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    BackgroundColor: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'none']
    >;
    Button: Schema.Attribute.Component<'elements.button', false>;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_grids';
  info: {
    displayName: 'CardGrid';
    icon: 'crop';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'elements.card', true>;
    ColumnsNumber: Schema.Attribute.Enumeration<['two', 'three', 'four']>;
    Description: Schema.Attribute.Text;
    SectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'file';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    CTA: Schema.Attribute.Component<'elements.button', false>;
    Description: Schema.Attribute.Text;
    Heading: Schema.Attribute.String;
    ShowScrollIndicator: Schema.Attribute.Boolean;
  };
}

export interface SectionsHighlights extends Struct.ComponentSchema {
  collectionName: 'components_sections_highlights';
  info: {
    displayName: 'Highlights';
    icon: 'crown';
  };
  attributes: {
    Highlights: Schema.Attribute.Component<'elements.highlight-card', true>;
    Title: Schema.Attribute.Text;
  };
}

export interface SectionsMemberships extends Struct.ComponentSchema {
  collectionName: 'components_sections_memberships';
  info: {
    displayName: 'Memberships';
    icon: 'manyToMany';
  };
  attributes: {
    MainTitle: Schema.Attribute.String;
    Plans: Schema.Attribute.Component<'elements.membership-plan', true>;
    SubTitle: Schema.Attribute.String;
  };
}

export interface SectionsMultiplePartners extends Struct.ComponentSchema {
  collectionName: 'components_sections_multiple_partners';
  info: {
    displayName: 'MultiplePartners';
    icon: 'briefcase';
  };
  attributes: {
    Partner: Schema.Attribute.Component<'elements.partner', true>;
  };
}

export interface SectionsOrganisations extends Struct.ComponentSchema {
  collectionName: 'components_sections_organisations';
  info: {
    displayName: 'Organisations';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface SectionsTextMedia extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_medias';
  info: {
    displayName: 'TextMedia';
    icon: 'attachment';
  };
  attributes: {
    BackgroundColor: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'none']
    >;
    Media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    MediaPosition: Schema.Attribute.Enumeration<['left', 'right']>;
    Text: Schema.Attribute.Blocks;
  };
}

export interface SectionsValues extends Struct.ComponentSchema {
  collectionName: 'components_sections_values';
  info: {
    displayName: 'Values';
    icon: 'arrowUp';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'elements.info-card', true>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.accordion-element': ElementsAccordionElement;
      'elements.button': ElementsButton;
      'elements.card': ElementsCard;
      'elements.highlight-card': ElementsHighlightCard;
      'elements.info-card': ElementsInfoCard;
      'elements.membership-plan': ElementsMembershipPlan;
      'elements.menu-item': ElementsMenuItem;
      'elements.menu-link': ElementsMenuLink;
      'elements.partner': ElementsPartner;
      'elements.socials': ElementsSocials;
      'sections.accordion': SectionsAccordion;
      'sections.actions': SectionsActions;
      'sections.call-to-action': SectionsCallToAction;
      'sections.card-grid': SectionsCardGrid;
      'sections.hero': SectionsHero;
      'sections.highlights': SectionsHighlights;
      'sections.memberships': SectionsMemberships;
      'sections.multiple-partners': SectionsMultiplePartners;
      'sections.organisations': SectionsOrganisations;
      'sections.text-media': SectionsTextMedia;
      'sections.values': SectionsValues;
    }
  }
}
