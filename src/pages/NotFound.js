
export default function NotFound() {
	return (
		<section className="bg-white dark:bg-gray-900 ">
			<div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
					<div>
							<p className="text-2xl font-medium text-orange-500 dark:text-orange-400">404 error</p>
							<h1 className="mt-3 text-3xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can’t find that page</h1>
							<p className="mt-4 text-gray-500 dark:text-gray-400 italic">"Its not a bug, its a feature"</p>
							<div className="flex items-center mt-6 gap-x-3">
							</div>
					</div>
			</div>
		</section>
	)
}