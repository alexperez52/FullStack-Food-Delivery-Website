package com.example.demo.security;


import com.example.demo.model.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    MyUserDetailsService myUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService).passwordEncoder(passwordEncoder());


    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(7);
    }

    @Override
    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Primary
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManager();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .and()
                .authorizeRequests()
                .antMatchers("/setRatings").permitAll()
                .antMatchers("/restaurantRatings").permitAll()
                .antMatchers("/updateUser").permitAll()
                .antMatchers("/currentUser").permitAll()
                .antMatchers("/restaurantItems").permitAll()
                .antMatchers("/test").permitAll()
                .antMatchers("/restaurants").permitAll()
                .antMatchers("/restaurant").permitAll()
                .antMatchers("/specificRestaurant").permitAll()
                .antMatchers("/registration").permitAll()
                .antMatchers("/users").permitAll()
                .antMatchers("/login").permitAll()
                .anyRequest()
                .authenticated();
//                .and()
//                .formLogin().loginProcessingUrl("/login");
    }
}
