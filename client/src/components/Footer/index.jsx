import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  margin-top: auto;
  background-color: #6c757d;
  padding: 20px 0;
  color: white;
  text-align: center;
`;

const FooterContent = styled.div`
  .emoji {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const GitHubLinks = styled.div`
  margin-top: 10px;
  a {
    color: #61dafb;
    margin: 0 10px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const teamMembers = [
  { name: 'ZachariahKB', github: 'https://github.com/ZachariahKB' },
  { name: 'Pauleerama93', github: 'https://github.com/Pauleerama93' },
  { name: 'Gitongah', github: 'https://github.com/gitongah' },
  { name: 'Joshyy55', github: 'https://github.com/Joshyy55' },
];

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        Check us out at our GitHubs!
        <GitHubLinks>
          {teamMembers.map(member => (
            <a key={member.name} href={member.github} target="_blank" rel="noopener noreferrer">
              {member.name}
            </a>
          ))}
        </GitHubLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
