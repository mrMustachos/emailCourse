function localtunnel {
  lt -s rcuqfosmybfwwkkjxqscobrx --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done