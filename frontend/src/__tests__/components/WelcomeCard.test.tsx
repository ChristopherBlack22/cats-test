import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import WelcomeCard from '../../components/WelcomeCard';

const MOCK_PROPS = {
  title: 'Your next delivery for Dorian and Ocie',
  message: "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
  totalPrice: 134,
  freeGift: true,
};
 
describe('Page', () => {
  it('renders a title with the correct content', () => {
    render(<WelcomeCard {...MOCK_PROPS} />);
    const title = screen.getByRole('heading', {name: 'Your next delivery for Dorian and Ocie'});
    expect(title).toBeVisible();
  });
  it('renders the correct message', () => {
    render(<WelcomeCard {...MOCK_PROPS} />);
    const message = screen.getByText("Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.");
    expect(message).toBeVisible();
  });
  it('renders the total price in the correct format', () => {
    render(<WelcomeCard {...MOCK_PROPS} />);
    const price = screen.getByText('Total price: £134.00');
    expect(price).toBeVisible();
  });
  it('renders 2 two links', () => {
    render(<WelcomeCard {...MOCK_PROPS} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    const linkOne = screen.getByRole('link', {name: 'SEE DETAILS'});
    const linkTwo = screen.getByRole('link', {name: 'EDIT DELIVERY'});
    expect(linkOne).toBeVisible();
    expect(linkTwo).toBeVisible();
  });
  it('renders a Free Gift sticker when applicable', () => {
    render(<WelcomeCard {...MOCK_PROPS} />);
    const freeGift = screen.getByText('FREE GIFT');
    expect(freeGift).toBeVisible();
  });
  it('doesnt render a Free Gift sticker when applicable', () => {
    render(<WelcomeCard {...{...MOCK_PROPS, freeGift: false}} />);
    const freeGift = screen.queryByText('FREE GIFT');
    expect(freeGift).toBeNull();
  });
})