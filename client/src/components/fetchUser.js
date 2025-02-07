async function fetchUserProfile() {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
  
      if (response.ok) {
        const user = await response.json();
        // Update the UI with the user's profile information
        console.log('User profile:', user);
      } else {
        console.log('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
