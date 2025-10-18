import JoinGameForm from '../JoinGameForm';

export default function JoinGameFormExample() {
  return <JoinGameForm onJoin={(name, code) => console.log('Joined:', name, code)} />;
}
