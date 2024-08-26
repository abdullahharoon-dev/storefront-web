import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Storefront</h3>
            <p className="text-sm text-gray-600">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-gray-900">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-gray-900">Categories</Link></li>
              <li><Link href="/brands" className="hover:text-gray-900">Brands</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/profile" className="hover:text-gray-900">Profile</Link></li>
              <li><Link href="/orders" className="hover:text-gray-900">Orders</Link></li>
              <li><Link href="/wishlist" className="hover:text-gray-900">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-gray-900">Help Center</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Storefront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
