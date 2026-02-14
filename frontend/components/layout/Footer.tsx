const Footer = () => {
  return (
    <footer className="py-8 border-t border-border dark:border-border-dark bg-primary-bg dark:bg-primary-bg-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-primary-text dark:text-primary-text-dark">TodoApp</span>
            </div>
            <p className="text-secondary-text dark:text-secondary-text-dark text-sm mt-2">
              A modern, productive todo application
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-secondary-text dark:text-secondary-text-dark hover:text-accent-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-text dark:text-secondary-text-dark hover:text-accent-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-text dark:text-secondary-text-dark hover:text-accent-primary transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border dark:border-border-dark text-center text-secondary-text dark:text-secondary-text-dark text-sm">
          © {new Date().getFullYear()} Created by Muhammad Hassan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;