import React from 'react';
import { useParams } from 'react-router-dom';
import { AccessoryProductTemplate } from '../components/product/templates/AccessoryProductTemplate';
import { StandardProductTemplate } from '../components/product/templates/StandardProductTemplate';
import { ThreeColumnProductTemplate } from '../components/product/templates/ThreeColumnProductTemplate';
import { catalogService } from '../utils/catalogService';
import { NotFound } from './NotFound';

export function ProductDetail() {
  const { slug = '' } = useParams();
  const product = catalogService.getBySlug(slug);

  if (!product) return <NotFound />;

  switch (product.template) {
    case 'three-column':
      return <ThreeColumnProductTemplate product={product} />;
    case 'accessory':
      return <AccessoryProductTemplate product={product} />;
    default:
      return <StandardProductTemplate product={product} />;
  }
}