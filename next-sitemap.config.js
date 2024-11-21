const fetchDynamicRoutes = async () => {
    
    return ['/blog/blogId', '/template/resume'];
};


module.exports = {
    siteUrl: 'https://resume.giveaways4u.com', // Replace with your actual domain
    generateRobotsTxt: true,          // Generates a robots.txt file
    changefreq: 'daily',
    priority: 0.8,
    sitemapSize: 5000,                // Max URLs per file
};

