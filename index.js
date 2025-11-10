import axios from 'axios';

export default async function handler(req, res) {
  const { shop, variantId } = req.query; // Get query parameters
  const token = process.env.SHOPIFY_TOKEN; // Store your token in Vercel Environment Variables

  if (!shop || !variantId) {
    return res.status(400).json({ error: 'shop and variantId are required' });
  }

  try {
    const response = await axios.get(
      `https://${shop}/admin/api/2025-07/variants/${variantId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data.variant);
  } catch (error) {
    res
      .status(500)
      .json(error.response?.data || { message: error.message });
  }
}
