import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const IntroPage = () => {
    return (
        <div>
            <Navbar />
            <div className="intro-page">
                <h1>Welcome Back to WealthWave</h1>
                <p>Let's continue your journey to financial success!</p>
                <div className='intro-sections'>
                  <div>
                      <h2>Quick Access</h2>
                      <ul>
                          <li>📈 <strong>Dashboard:</strong> Get an overview of your financial health.</li>
                          <li>💳 <strong>Recent Transactions:</strong> Review your latest expenses and incomes.</li>
                          <li>📊 <strong>Investments:</strong> Check the performance of your investment portfolio.</li>
                      </ul>
                  </div>
                  <div>
                      <h2>WealthWave ft. Management Tools</h2>
                      <p>The greatest remix since Eminem and Rihanna</p>
                      <ul>
                          <li>🆕 <strong>Goals Tracker:</strong> Set and monitor your financial goals.</li>
                          <li>🔍 <strong>Spending Insights:</strong> Discover new ways to save with personalized spending insights.</li>
                          <li>💡 <strong>Financial Tips:</strong> Access tips and articles to improve your financial knowledge.</li>
                      </ul>
                  </div>
                  <div>
                      <h2>Maximize Your WealthWave Experience</h2>
                      <p>Take advantage of these tools and resources for better financial management:</p>
                      <ul>
                          <li>🔄 <strong>Automate Savings:</strong> Use CSVs to effortlessly view your progress.</li>
                          <li>🔖 <strong>Custom Categories:</strong> Personalize your expense categories for more detailed tracking.</li>
                      </ul>
                  </div>
                  <div>
                      <h2>Need Assistance?</h2>
                      <p>Our support team is here to help you with any questions or issues.</p>
                  </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default IntroPage;