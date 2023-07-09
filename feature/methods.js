module.exports = {
  /**************
  method: solutions
  params: packet
  describe: The global solutions feature that installs with every agent
  ***************/
  solutions(packet) {
    this.context('feature');
    const solutions = this.solutions();
    const data = {};
    return new Promise((resolve, reject) => {
      this.question(`#docs raw feature/solutions`).then(doc => {
        data.doc = doc.a.data;
        const info = [
          `## Solutions`,
          `::begin:solutions:${solutions.id}`,
          `client: ${solutions.client_name}`,
          `concerns: ${solutions.concerns.join(', ')}`,
          `::end:solutions:${this.hash(solutions)}`,
        ].join('\n');
        const text = doc.a.text.replace(/::info::/g, info)
        return this.question(`#feecting parse ${text}`)
      }).then(feecting => {
        return resolve({
          text: feecting.a.text,
          html: feecting.a.html,
          data: solutions
        });
      }).catch(err => {
        return this.error(err, packet, reject);
      })
    });
  },
};
