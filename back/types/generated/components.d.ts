import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.button': ElementsButton;
      'elements.menu-item': ElementsMenuItem;
      'elements.menu-link': ElementsMenuLink;
      'elements.partner': ElementsPartner;
      'sections.hero': SectionsHero;
      'sections.multiple-partners': SectionsMultiplePartners;
    }
  }
}
