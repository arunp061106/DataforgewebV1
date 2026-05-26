import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

try:
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(options=options)
    
    filepath = 'file:///' + os.path.abspath('index.html').replace('\\', '/')
    driver.get(filepath)
    
    # Retrieve logs
    logs = driver.get_log('browser')
    print('Console Logs:')
    for log in logs:
        print(log)
        
    driver.quit()
except Exception as e:
    print('Error running selenium check:', e)
