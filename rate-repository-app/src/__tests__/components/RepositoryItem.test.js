import { Text, View } from 'react-native';
import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        render(<RepositoryListContainer repositories={repositories}/>)
        const repositoryItems = screen.getAllByTestId('repositoryItem');
        const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
        expect(within(firstRepositoryItem).getByTestId("fullName")).toHaveTextContent('jaredpalmer/formik')
        expect(within(secondRepositoryItem).getByTestId("fullName")).toHaveTextContent('async-library/react-async');

        expect(within(firstRepositoryItem).getByTestId("description")).toHaveTextContent('Build forms in React, without the tears')
        expect(within(secondRepositoryItem).getByTestId("description")).toHaveTextContent('Flexible promise-based React data loader');

        expect(within(firstRepositoryItem).getByTestId("language")).toHaveTextContent('TypeScript')
        expect(within(secondRepositoryItem).getByTestId("language")).toHaveTextContent('JavaScript');

        expect(within(firstRepositoryItem).getByTestId("stars")).toHaveTextContent('21.9kstars')
        expect(within(secondRepositoryItem).getByTestId("stars")).toHaveTextContent('1.8kstars');

        expect(within(firstRepositoryItem).getByTestId("forks")).toHaveTextContent('1.6kforks')
        expect(within(secondRepositoryItem).getByTestId("forks")).toHaveTextContent('69forks');

        expect(within(firstRepositoryItem).getByTestId("review")).toHaveTextContent('3reviews')
        expect(within(secondRepositoryItem).getByTestId("review")).toHaveTextContent('3reviews');

        expect(within(firstRepositoryItem).getByTestId("rating")).toHaveTextContent('88rating')
        expect(within(secondRepositoryItem).getByTestId("rating")).toHaveTextContent('72rating');

        expect(within(firstRepositoryItem).getByTestId("logo")).toHaveProp("src", 'https://avatars2.githubusercontent.com/u/4060187?v=4')
        expect(within(secondRepositoryItem).getByTestId("logo")).toHaveProp("src", 'https://avatars1.githubusercontent.com/u/54310907?v=4');
        
      });
    });
  });