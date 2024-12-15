package rw.veterinarian.veterinarian.security.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import rw.veterinarian.veterinarian.model.User;
import rw.veterinarian.veterinarian.repository.UserRepository;
@Service
@RequiredArgsConstructor
public class VetDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
return VetDetails.buildUserDetails(user);
}

}

