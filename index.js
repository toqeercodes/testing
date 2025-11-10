export default async function handler(req, res) {
  const { shop, variantId } = req.query;

  if (!shop || !variantId) {
    return res.status(400).json({ error: 'Missing shop or variantId' });
  }

  const token = process.env.SHOPIFY_TOKEN;

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-10/variants/${variantId}.json`, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
