import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import JoinGameForm from "@/components/JoinGameForm";
import WaitingLobby from "@/components/WaitingLobby";
import HostScreen from "@/pages/HostScreen";
import PlayerScreen from "@/pages/PlayerScreen";
import ResultsScreen from "@/components/ResultsScreen";

//todo: remove mock functionality - These are example pages
function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <JoinGameForm onJoin={(name, code) => console.log('Joined:', name, code)} />}
      </Route>
      <Route path="/lobby" component={LobbyExample} />
      <Route path="/host" component={HostScreen} />
      <Route path="/player" component={PlayerScreen} />
      <Route path="/results" component={ResultsExample} />
      <Route component={NotFound} />
    </Switch>
  );
}

//todo: remove mock functionality
function LobbyExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz' },
    { id: '2', name: 'Ayşe Demir' },
    { id: '3', name: 'Mehmet Kaya' },
    { id: '4', name: 'Zeynep Çelik' },
    { id: '5', name: 'Can Aydın' },
  ];

  return (
    <WaitingLobby
      players={players}
      gameCode="ABC123"
      isHost={true}
      onStartGame={() => console.log('Starting game...')}
    />
  );
}

//todo: remove mock functionality
function ResultsExample() {
  const players = [
    { id: '1', name: 'Ahmet Yılmaz', score: 2750, rank: 1, wasCorrect: true, pointsEarned: 1000 },
    { id: '2', name: 'Ayşe Demir', score: 2500, rank: 2, wasCorrect: true, pointsEarned: 750 },
    { id: '3', name: 'Mehmet Kaya', score: 2250, rank: 3, wasCorrect: false, pointsEarned: 0 },
    { id: '4', name: 'Zeynep Çelik', score: 1750, rank: 4, wasCorrect: true, pointsEarned: 500 },
  ];

  return (
    <ResultsScreen
      players={players}
      correctAnswer="Galata Kulesi"
      roundNumber={3}
      onNextRound={() => console.log('Next round')}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
